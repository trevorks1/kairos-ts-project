import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

/**
 * GET routes
 */

// GET Number of people volunteering for a posting by posting ID /api/postings/volunteers/:id
router.get(
  '/volunteers/:id',
  rejectUnauthenticated,
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT ARRAY(SELECT "group".number_of_people FROM "group", "posting_volunteers" 
    WHERE "posting_volunteers".posting_id = $1 AND "posting_volunteers".group_id = "group".id) as volunteered;`;
    pool
      .query(queryText, [req.params.id])
      .then((dbResponse) => {
        console.log(dbResponse.rows[0].volunteered);
        let total = 0;
        for (let i = 0; i < dbResponse.rows[0].volunteered.length; i++) {
          total += Number(dbResponse.rows[0].volunteered[i]);
        }
        res.send([total]);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

// GET posting by ID
router.get(
  '/details/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT "postings".*, "organization".organization_name, "organization".logo,
    ARRAY(SELECT DISTINCT "ages".range FROM "ages", "posting_ages" WHERE "posting_ages".posting_id = "postings".id AND "ages".id = "posting_ages".ages_id AND "posting_ages".posting_id = "postings".id) as age_ranges, 
    ARRAY(SELECT DISTINCT "activity_type".activity_name FROM "activity_type", "posting_activity" WHERE "posting_activity".posting_id = "postings".id AND "activity_type".id = "posting_activity".activity_type_id AND "posting_activity".posting_id = "postings".id ) as activities
    FROM "organization" 
    JOIN "postings" ON "organization".id = "postings".org_id
    WHERE "postings".id = $1;`;
    pool
      .query(queryText, [req.params.id])
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

// GET All postings
router.get(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT "postings".*, "organization".organization_name,
    ARRAY(SELECT DISTINCT "ages".range FROM "ages", "posting_ages" WHERE "posting_ages".posting_id = "postings".id AND "ages".id = "posting_ages".ages_id AND "posting_ages".posting_id = "postings".id) as age_ranges, 
    ARRAY(SELECT DISTINCT "activity_type".activity_name FROM "activity_type", "posting_activity" WHERE "posting_activity".posting_id = "postings".id AND "activity_type".id = "posting_activity".activity_type_id AND "posting_activity".posting_id = "postings".id ) as activities
    FROM "organization" 
    JOIN "postings" ON "organization".id = "postings".org_id
    WHERE "postings".active = true;`;
    pool
      .query(queryText)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

// GET Postings by Cause type
router.get(
  '/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    try {
      // GET route code here
      const queryText = `SELECT ARRAY(SELECT "postings".id FROM "postings", "org_causes" 
    WHERE "org_causes".org_id = "postings".org_id AND "org_causes".cause_id = $1) as posting_id;`;
      pool.query(queryText, [req.params.id]).then((dbResponse) => {
        const postings = dbResponse.rows[0].posting_id;
        const postingResult = [];

        for (let i = 0; i < postings.length; i++) {
          const postingQuery = `SELECT "postings".*, "organization".organization_name,
          ARRAY(SELECT DISTINCT "ages".range FROM "ages", "posting_ages" WHERE "posting_ages".posting_id = $1 AND "ages".id = "posting_ages".ages_id) as age_ranges, 
          ARRAY(SELECT DISTINCT "activity_type".activity_name FROM "activity_type", "posting_activity" WHERE "posting_activity".posting_id = $1 AND "activity_type".id = "posting_activity".activity_type_id) as activities
          FROM "organization" 
          JOIN "postings" ON "organization".id = "postings".org_id
          WHERE "postings".id = $1;
          `;
          postingResult.push(pool.query(postingQuery, [postings[i]]));
        }

        Promise.all(postingResult).then((result) => {
          let allResults = [];
          for (let i = 0; i < result.length; i++) {
            allResults.push(result[i].rows[0]);
          }
          res.send(allResults);
        });
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

// GET Postings by Browse criteria /api/postings/browse
router.get(
  '/browse/:activity/:age/:cause',
  (req: any, res: Response, next: express.NextFunction): void => {
    let activity = `AND "activity_type".id > 0 `;
    let age = `AND "ages".id > 0 `;
    let cause = `AND "org_causes".id > 0 `;
    // this is dirty but we're sending 0 if nothing is selected from the filters on the front
    if (req.params.activity != 0) {
      activity = `AND "activity_type".id = ${req.params.activity}`;
    }
    if (req.params.age != 0) {
      age = `AND "ages".id = ${req.params.age}`;
    }
    if (req.params.cause != 0) {
      cause = `AND "org_causes".cause_id = ${req.params.cause}`;
    }
    const queryText = `SELECT DISTINCT "postings".*, "organization".organization_name
    FROM "postings", "causes", "activity_type", "ages", "posting_ages", "organization", "posting_activity", "org_causes"
    WHERE "postings".active = true AND "posting_ages".posting_id = "postings".id AND "ages".id = "posting_ages".ages_id 
    AND "posting_ages".posting_id = "postings".id AND"posting_activity".posting_id = "postings".id 
    AND "activity_type".id = "posting_activity".activity_type_id AND "posting_activity".posting_id = "postings".id 
    AND "org_causes".org_id = "postings".org_id AND "postings".org_id = "organization".id ${activity} ${age} ${cause};`;

    pool
      .query(queryText)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

/**
 * POST route template
 */
router.post(
  '/',

  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    try {
      // POST route code here
      const post: any = req.body;
      const queryText: string = `INSERT INTO "postings" ("org_id", "title", "date_to_attend", 
      "start_time", "end_time", "location", "description", "repeating", "frequency", "people_needed", 
      "active")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 't')
      RETURNING "id";`;
      const queryArray = [
        post.org_id,
        post.title,
        post.date_to_attend,
        post.start_time,
        post.end_time,
        post.location,
        post.description,
        post.repeating,
        post.frequency,
        post.people_needed,
      ];

      pool.query(queryText, queryArray).then((dbResponse) => {
        const orgActivity = [];

        for (let i = 0; i < req.body.activity_type_id.length; i++) {
          const queryText = `INSERT INTO "posting_activity" ("posting_id", "activity_type_id")
          VALUES ($1, $2);`;

          orgActivity.push(
            pool.query(queryText, [
              parseInt(dbResponse.rows[0].id),
              parseInt(req.body.activity_type_id[i]),
            ])
          );
        }

        const orgAges = [];

        for (let i = 0; i < req.body.ages_id.length; i++) {
          const queryText = `INSERT INTO "posting_ages" ("posting_id", "ages_id")
            VALUES ($1, $2);`;

          orgAges.push(
            pool.query(queryText, [
              parseInt(dbResponse.rows[0].id),
              parseInt(req.body.ages_id[i]),
            ])
          );
        }

        Promise.all(orgActivity);
        Promise.all(orgAges).then((response) => {
          res.sendStatus(200);
        });
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

// POST volunteer volunteering for posting /api/postings/avol
router.post(
  '/avol/:posting_id',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    const queryText = `INSERT INTO "group" (number_of_people)
    VALUES (1) RETURNING id;`;
    pool
      .query(queryText)
      .then((result) => {
        const groupId = Number(result.rows[0].id);

        const postQuery = `INSERT INTO "posting_volunteers" (user_id, posting_id, group_id, waiver_agreement) 
        VALUES ($1, $2, $3, true);`;
        pool.query(postQuery, [req.user['id'], req.params.posting_id, groupId]);
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(500));
  }
);

// POST group of volunteers volunteering for posting /api/postings/avol
router.post(
  '/gvol',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    let groupId: Number;
    let number_of_people = 0 + req.body.group_members.length;
    const queryText = `INSERT INTO "group" (number_of_people)
    VALUES ($1) RETURNING id;`;
    pool
      .query(queryText, [number_of_people])
      .then((result) => {
        groupId = Number(result.rows[0].id);
        const postQuery = `INSERT INTO "posting_volunteers" (user_id, posting_id, group_id, waiver_agreement) 
        VALUES ($1, $2, $3, true);`;
        pool.query(postQuery, [req.user['id'], req.body.posting_id, groupId]);
      })

      .then((result) => {
        for (let i = 0; i < req.body.group_members.length; i++) {
          const postQuery = `INSERT INTO "group_members" ("group_id", "member_name", "email", "age_id", "waiver_signed")
          VALUES ($1, $2, $3, $4, false)`;
          pool.query(postQuery, [
            groupId,
            req.body.group_members[i].member_name,
            req.body.group_members[i].email,
            req.body.group_members[i].age_id,
          ]);
        }
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('#### POST GROUP VOLUNTEERS ROUTE ERROR: ', err);
        res.sendStatus(500);
      });
  }
);

router.put(
  '/edit/:id',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    const queryText = `UPDATE "postings" SET "date_to_attend"=$1, "start_time"=$2, "end_time"=$3, 
    "location"=$4, "description"=$5, "repeating"=$6, "frequency"=$7, "people_needed"=$8, "title"=$9
    WHERE "id"=$10;`;

    pool
      .query(queryText, [
        req.body.date_to_attend,
        req.body.start_time,
        req.body.end_time,
        req.body.location,
        req.body.description,
        req.body.repeating,
        req.body.frequency,
        req.body.people_needed,
        req.body.title,
        req.params.id,
      ])
      .then((dbResponse) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('#### PUT ROUTE ERROR: ', err);
        res.sendStatus(500);
      });
  }
);

router.put(
  '/active/:id',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    const queryText = `UPDATE "postings" SET "active"=FALSE WHERE "id"=$1;`;

    pool
      .query(queryText, [req.params.id])
      .then((dbResponse) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

export default router;

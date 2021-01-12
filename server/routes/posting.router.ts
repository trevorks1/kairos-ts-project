import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

/**
 * GET routes
 */

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
        console.log(dbResponse);
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
      const queryText: string = `INSERT INTO "postings" ("org_id", "date_posted", "date_to_attend", 
      "start_time", "end_time", "location", "description", "repeating", "frequency", "people_needed", 
      "active")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 't')
      RETURNING "id";`;
      const queryArray = [
        post.org_id,
        post.date_posted,
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

router.put(
  '/edit/:id',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    const queryText = `UPDATE "postings" SET "date_to_attend"=$1, "start_time"=$2, "end_time"=$3, 
    "location"=$4, "description"=$5, "repeating"=$6, "frequency"=$7, "people_needed"=$8
    WHERE "id"=$9;`;

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

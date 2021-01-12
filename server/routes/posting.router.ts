import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get(

  '/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route code here
    const queryText = `SELECT * FROM "postings"
      JOIN "posting_ages" ON "posting_ages".posting_id = "postings".id
      JOIN "ages" ON "posting_ages".ages_id = "ages".id
      JOIN "posting_activity" ON "posting_activity".posting_id = "postings".id
      JOIN "activity_type" ON "posting_activity".activity_type_id = "activity_type".id
      JOIN "organization" ON "organization".id = "postings".org_id
      JOIN "org_causes" ON "org_causes".org_id = "organization".id
      JOIN "causes" ON "org_causes".cause_id = "causes".id
      WHERE "causes".id = $1;`;

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


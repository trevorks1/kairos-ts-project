import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
//import { rejectUnauthenticated } from '../modules/authentication-middleware';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route code here
  }
);

/**
 * POST route template
 */
router.post(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    try {
      // POST route code here
      const post: any = req.body;
      const queryText: string = `INSERT INTO "postings" ("org_id", "date_posted", "date_to_attend", 
      "start_time", "end_time", "location", "description", "repeating", "frequency", "people_needed", 
      "active")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
        post.active,
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

export default router;

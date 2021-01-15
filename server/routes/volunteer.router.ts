import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get('/', (req: any, res: Response, next: express.NextFunction): void => {
  const queryText = `SELECT * FROM "postings", "posting_volunteers" WHERE "postings".id = "posting_volunteers".posting_id AND "posting_volunteers".user_id = $1;`;
  pool
    .query(queryText, [req.user['id']])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code here
  }
);

export default router;

// SELECT * FROM "postings", "posting_volunteers" WHERE "postings".id = "posting_volunteers".posting_id AND "posting_volunteers".user_id = 7;

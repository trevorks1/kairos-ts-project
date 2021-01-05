import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to retrieve list of all causes
 */
router.get(
  '/all',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route code here
    const queryText: string =
      'SELECT "cause" from "causes" ORDER BY "cause" ASC;';

    pool
      .query(queryText)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log('Could not get list of causes', err);
        res.sendStatus(500);
      });
  }
);

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

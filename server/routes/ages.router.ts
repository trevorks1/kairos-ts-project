import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to retrieve list of all age-ranges
 */
router.get(
  '/all',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = 'SELECT * from "ages" ORDER BY "id" ASC;';

    pool
      .query(queryText)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log('Could not get list of age ranges', err);
        res.sendStatus(500);
      });
  }
);

export default router;

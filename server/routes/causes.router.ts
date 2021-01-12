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
    const queryText: string = 'SELECT * from "causes" ORDER BY "cause" ASC;';

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
 * GET route to retrieve all events for a selected cause type
 */
router.get(
  '/select/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const causeId: number = parseInt(req.params.id);
    const queryText: string = `SELECT * from "postings"
    JOIN "organization" ON "postings".org_id = "organization".id
    JOIN "org_causes" ON "organization".id = "org_causes".org_id
    JOIN "causes" ON "org_causes".cause_id = "causes".id
    WHERE "causes".id = $1;`;

    pool
      .query(queryText, [causeId])
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log(
          'Could not get activities that match this cause type!',
          err
        );
        res.sendStatus(500);
      });
  }
);

export default router;

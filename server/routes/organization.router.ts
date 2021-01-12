import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET /api/organization/causes/:id id has to be org id not user id
 * GET from organization table, org_causes, causes
 */
router.get(
  '/causes/:id',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT "cause" FROM "causes"
    JOIN "org_causes" ON "causes".id = "org_causes".cause_id
    JOIN "organization" ON "org_causes".org_id = "organization".id
    WHERE "organization".id = $1;`;

    pool
      .query(queryText, [req.params.id])
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log('Could not retrieve the list of organization causes!', err);
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


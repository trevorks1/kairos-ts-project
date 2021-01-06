import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET list of organizations to be validated
 */
router.get(
  '/requested',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route code here
    const queryText = `SELECT * FROM "user" 
    JOIN "organization" ON "user".id = "organization".user_id 
    WHERE "user".active = false;`;

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

router.get(
  '/approved',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route code here
    const queryText = `SELECT * FROM "user" 
    JOIN "organization" ON "user".id = "organization".user_id 
    WHERE "user".active = true;`;

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

/**
 * PUT routes
 */

// Update to approve organizations registration user table access_level_id changes
router.put(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code here
  }
);

// Update to add an activity to activity_type table
router.put(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code here
  }
);

// Update to add cause to causes table
router.put(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // POST route code here
  }
);

export default router;

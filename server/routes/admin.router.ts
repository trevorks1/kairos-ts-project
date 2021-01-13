import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

import rejectUnauthenticated from '../modules/authentication-middleware';


const router: express.Router = express.Router();

/**

 * GET list of organizations to be validated
 */
router.get(
  '/requested',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    // GET route code here
    if (req.user['access_level_id'] == 1) {
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
      return;
    }
    res.sendStatus(403);
  }
);

router.get(
  '/approved',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    // GET route code here
    if (req.user['access_level_id'] == 1) {
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
      return;
    }
    res.sendStatus(403);
  }
);

/**
 * PUT routes
 */

// Update to approve organizations registration user table active to true
router.put(
  '/approve/:id',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    // put route code here

    if (req.user['access_level_id'] == 1) {
      pool
        .query(`UPDATE "user" SET active = true WHERE "user".id=$1;`, [
          req.params.id,
        ])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log('Error Approve', error);
          res.sendStatus(500);
        });
      return;
    }
    res.sendStatus(403);
  }
);

// DELETE route for denying an organization's registration request
router.delete(
  '/delete/:id',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    console.log('Delete route', req.params.id);
    console.log('Access Level', req.user);
    if (req.user['access_level_id'] == 1) {
      pool
        .query(`DELETE FROM "user" WHERE "user".id=$1;`, [req.params.id])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log('Error DELETE', error);
          res.sendStatus(500);
        });
      return;
    }
    res.sendStatus(403);

  }
);

/**
 * POST route template
 */
router.post(
  '/activity',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    if (req.user['access_level_id'] == 1) {
      const queryText = `INSERT INTO "activity_type" (activity_name) VALUES ($1);`;
      pool
        .query(queryText, [req.body.activity_name])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
      return;
    }
    res.sendStatus(403);
  }
);

router.post(
  '/cause',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    if (req.user['access_level_id'] == 1) {
      const queryText = `INSERT INTO "causes" (cause) VALUES ($1);`;
      pool
        .query(queryText, [req.body.cause])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
      return;
    }
    res.sendStatus(403);
  }
);

export default router;


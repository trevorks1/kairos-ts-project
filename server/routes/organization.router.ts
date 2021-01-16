import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';
import rejectUnauthenticated from '../modules/authentication-middleware';

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

// GET api/organization/profile for org profile page
router.get(
  '/profile',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    let orgId: Number;
    const queryText: string = `SELECT DISTINCT "organization".id from "organization" WHERE "organization".user_id = $1;`;
    // GET Org ID by user ID
    pool.query(queryText, [req.user['id']]).then((result) => {
      orgId = Number(result.rows[0].id);
      const orgQuery = `SELECT "organization".* FROM "organization" WHERE "organization".id = $1;`;
      // GET Organization info by returned Org ID
      pool
        .query(orgQuery, [orgId])
        .then((resultOrg) => {
          let organization = resultOrg.rows[0];
          const postingsQuery = `SELECT DISTINCT * FROM "postings" WHERE "postings".org_id = $1 AND "postings".active = true;`;
          // GET Active postings by org id
          pool.query(postingsQuery, [orgId]).then((resultPostings) => {
            const postings = resultPostings.rows;
            const dbResponse = { org: organization, post: postings };
            res.send(dbResponse);
          });
        })
        .catch((err) => {
          console.log('Could not retrieve the organization profile!', err);
          res.sendStatus(500);
        });
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

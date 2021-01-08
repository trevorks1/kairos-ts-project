import { query, Request, Response } from 'express';
import express from 'express';
import rejectUnauthenticated from '../modules/authentication-middleware';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route retrieves all activities
 */
router.get(
  '/all',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string =
      'SELECT * FROM "activity_type" ORDER BY "activity_name" ASC;';

    pool
      .query(queryText)
      .then((dbResponse) => {
        res.send(dbResponse.rows);
      })
      .catch((err) => {
        console.log('Could not retrieve the list of activities!', err);
        res.sendStatus(500);
      });
  }
);

/*
 * TODO!!
 * GET saved preferred activities for a logged in volunteer user
 */

/*
 * POST a preferred activity for a logged in volunteer user
 * circumventing TS error by using type of 'any' on req ---
 */
router.post(
  '/save',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    try {
      // preferred activity id to save in DB (user_activity table)
      // it needs to be added to DB as an id! --> the id should be available on front end from the GET /all

      // data expected as an array of numbers! EVEN if it is a single number
      const activityToSave: number[] = req.body.activity_type_id;
      // empty array that the queries can be pushed into
      const arrayForPromise = [];
      const volunteerId = req.user['id']; // req.user["id"]  ???

      for (let i = 0; i < activityToSave.length; i++) {
        const queryText: string = `INSERT INTO "user_activity" (user_id, activity_type_id)
        VALUES ($1, $2);`;
        arrayForPromise.push(
          pool.query(queryText, [volunteerId, activityToSave[i]])
        );
      }

      Promise.all(arrayForPromise).then(() => {
        res.sendStatus(201);
      });
    } catch (err) {
      console.log('could not save preferred activities', err);
      res.sendStatus(500);
    }
  }
);

/*
 * DELETE saved preferred activity for a logged in volunteer user
 */
router.delete(
  '/delete',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    try {
      // Promise.all me you love me

      // data expected as an array of numbers! EVEN if it is a single number
      const activityToDelete: number[] = req.body.activity_type_id;
      // empty array that the queries can be pushed into
      const arrayForPromise = [];
      const volunteerId = req.user['id'];

      for (let i = 0; i < activityToDelete.length; i++) {
        const queryText: string = `DELETE FROM "user_activity" WHERE "user_id" = $1 AND "activity_type_id" = $2;`;
        arrayForPromise.push(
          pool.query(queryText, [volunteerId, activityToDelete[i]])
        );
      }

      Promise.all(arrayForPromise).then(() => {
        res.sendStatus(200);
      });
    } catch (err) {
      console.log('could not delete preferred activities', err);
      res.sendStatus(500);
    }
  }
);

/*
 * TODO!!
 * GET retrieve all postings filtered by logged in user's preferred activities
 */

//   SELECT * FROM "postings"
// JOIN "posting_activity" ON "postings".id = "posting_activity".posting_id
// JOIN "user_activity" ON "posting_activity".activity_type_id = "user_activity".activity_type_id
// JOIN "user" ON "user_activity".user_id = 1
// WHERE  "posting_activity".activity_type_id = "user_activity".activity_type_id;

export default router;

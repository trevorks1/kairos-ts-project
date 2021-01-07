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

/**
 * POST new activity type (for use by admin user)
 * TODO!!!
 * need to ADD rejectUnauthenticated once we are capable of testing with logged in admin user!!
 */
router.post(
  '/add',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // new activity to be saved into DB
    const newActivity: string = req.body.activity_name;

    const queryText: string = `INSERT INTO "activity_type" (activity_name)
    VALUES ($1);`;

    pool
      .query(queryText, [newActivity])
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Could not add new activity!', err);
        res.sendStatus(500);
      });
  }
);

/*
 * TODO!!
 * GET saved preferred activities for a logged in volunteer user
 */

/*
 * TODO!!
 * DELETE saved preferred activity for a logged in volunteer user
 */

/*
 * TODO!!
 * POST a preferred activity for a logged in volunteer user
 */
router.post(
  '/save',
  (req: Request, res: Response, next: express.NextFunction): void => {
    try {
      // preferred activity id to save in DB (user_activity table)
      // it needs to be added to DB as an id! --> the id should be available on front end from the GET /all

      // data expected as an array of numbers! EVEN if it is a single number
      const activityToSave: number[] = req.body.activity_type_id;
      // empty array that the queries can be pushed into
      const arrayForPromise = [];
      const volunteerId: number = req.user.id;

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

      // STEP - query DB to add activityToSave to user_activity
    } catch (err) {
      console.log('could not save preferred activities', err);
      res.sendStatus(500);
    }
  }
);

/*
 * TODO!!
 * GET retrieve all postings filtered by logged in user's preferred activities
 */

export default router;

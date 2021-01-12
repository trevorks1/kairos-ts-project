import { Request, Response } from 'express';
import express from 'express';
import rejectUnauthenticated from '../modules/authentication-middleware';
import pool from '../modules/pool';
import userStrategy from '../strategies/user.strategy';
import { encryptPassword } from '../modules/encryption';
const router: express.Router = express.Router();

/**
 * GET ROUTES
 */
router.get('/', rejectUnauthenticated, (req: Request, res: Response): void => {
  res.send(req.user);
});

// GET Volunteer info /api/user/volunteer
router.get(
  '/volunteer',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT "user".first_name, "user".last_name, "user".email_address, "user".phone_number, 
      ARRAY(SELECT DISTINCT "ages".range FROM "ages", "user_ages" WHERE "user_ages".user_id = $1 AND "ages".id = "user_ages".ages_id) as age_ranges,
      ARRAY(SELECT DISTINCT "activity_type".activity_name FROM "activity_type", "user_activity" WHERE "user_activity".activity_type_id = "activity_type".id AND "user_activity".user_id = $1)
      FROM "user"
      WHERE "user".id = $1;`;

    pool
      .query(queryText, [req.user.id])
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
 * END GET ROUTES
 */

router.post(
  '/register/vol',
  (req: any, res: Response, next: express.NextFunction): void => {
    try {
      const username: string | null = <string>req.body.username;
      const password: string | null = encryptPassword(req.body.password);
      const first_name: string | null = <string>req.body.first_name;
      const last_name: string | null = <string>req.body.last_name;
      const email_address: string | null = <string>req.body.email_address;
      const phone_number: string | null = <string>req.body.phone_number;
      const company: boolean | null = <boolean>req.body.company;
      const company_name: string | null = <string>req.body.company_name;
      const volunteer: boolean | null = <boolean>req.body.volunteer;
      const queryText: string = `INSERT INTO "user" (username, password, first_name, last_name, email_address, phone_number, 
    company, company_name, volunteer, active, access_level_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, 3) 
    RETURNING id;`;
      pool
        .query(queryText, [
          username,
          password,
          first_name,
          last_name,
          email_address,
          phone_number,
          company,
          company_name,
          volunteer,
        ])
        .then((result) => {
          const newUserId = result.rows[0].id;
          const userToActivity = [];
          for (let i = 0; i < req.body.activity_type_id.length; i++) {
            // looping through activity type array as they can select multiple
            const insertUserActivityQuery = `INSERT INTO "user_activity" ("activity_type_id", "user_id")
          VALUES ($1, $2);`;
            userToActivity.push(
              pool.query(insertUserActivityQuery, [
                parseInt(req.body.activity_type_id[i]),
                parseInt(newUserId),
              ])
            );
          }
          const userToAges = [];
          // for loop for age ranges query
          for (let i = 0; i < req.body.ages_id.length; i++) {
            // looping through ages_id array for the multi-select
            const insertAgeQuery = `INSERT INTO "user_ages" ("user_id", "ages_id")
          VALUES ($1, $2);`;
            userToAges.push(
              pool.query(insertAgeQuery, [
                parseInt(newUserId),
                parseInt(req.body.ages_id[i]),
              ])
            );
          }
          // Using Promise.all to require all results returned before moving on
          Promise.all(userToActivity);
          Promise.all(userToAges).then((result) => {
            res.sendStatus(201);
          });
        });
    } catch (err) {
      console.log(`Error saving user to database: ${err}`);
      res.sendStatus(500);
    }
  }
);
router.post(
  '/register/org',
  (req: Request, res: Response, next: express.NextFunction): void => {
    try {
      const username: string | null = <string>req.body.username;
      const password: string | null = encryptPassword(req.body.password);
      const first_name: string | null = <string>req.body.first_name;
      const last_name: string | null = <string>req.body.last_name;
      const email_address: string | null = <string>req.body.email_address;
      const phone_number: string | null = <string>req.body.phone_number;
      const company: boolean | null = <boolean>req.body.company;
      const company_name: string | null = <string>req.body.company_name;
      const volunteer: boolean | null = <boolean>req.body.volunteer;
      const queryText: string = `INSERT INTO "user" (username, password, first_name, last_name, email_address, phone_number, 
    company, company_name, volunteer, active, access_level_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false, 2) 
    RETURNING id;`;
      pool
        .query(queryText, [
          username,
          password,
          first_name,
          last_name,
          email_address,
          phone_number,
          company,
          company_name,
          volunteer,
        ])
        .then((result) => {
          const newUserId = result.rows[0].id;
          const insertOrgQuery = `INSERT INTO "organization" ("organization_name", "contact_title", "address", "mission",
          "summary", "website", "organization_type", "user_id")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id;`;
          pool
            .query(insertOrgQuery, [
              req.body.organization_name,
              req.body.contact_title,
              req.body.address,
              req.body.mission,
              req.body.summary,
              req.body.website,
              req.body.organization_type,
              parseInt(newUserId),
            ])
            .then((resultOrg) => {
              const newOrgId = resultOrg.rows[0].id;
              const orgToCauses = [];
              // for loop for org_causes query
              for (let i = 0; i < req.body.causes.length; i++) {
                // req.body.causes should be an array [1, 2, 3]
                const insertCausesQuery = `INSERT INTO "org_causes" ("org_id", "cause_id")
              VALUES ($1, $2);`;
                orgToCauses.push(
                  pool.query(insertCausesQuery, [
                    parseInt(newOrgId),
                    parseInt(req.body.causes[i]),
                  ])
                );
              }
              // Using Promise.all to require all results returned before moving on
              Promise.all(orgToCauses).then((result) => {
                res.sendStatus(201);
              });
            });
        });
    } catch (err) {
      console.log(`Error saving user to database: ${err}`);
      res.sendStatus(500);
    }
  }
);
router.post(
  '/login',
  userStrategy.authenticate('local'),
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);
router.post('/logout', (req: Request, res: Response): void => {
  req.logout();
  res.sendStatus(200);
});

// Update phone
router.put(
  '/update/phone',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    // put route code here

    pool
      .query(`UPDATE "user" SET phone_number = $1 WHERE "user".id=$2;`, [
        req.body.phone_number,
        req.user.id,
      ])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error changing phone number', error);
        res.sendStatus(500);
      });
    return;
  }
);

// Update phone
router.put(
  '/update/email',
  rejectUnauthenticated,
  (req: any, res: Response, next: express.NextFunction): void => {
    // put route code here

    pool
      .query(`UPDATE "user" SET email_address = $1 WHERE "user".id=$2;`, [
        req.body.email_address,
        req.user.id,
      ])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error changing email address', error);
        res.sendStatus(500);
      });
    return;
  }
);
export default router;

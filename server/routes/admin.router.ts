import { Request, Response } from 'express';
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET list of organizations to be validated
 */
router.get(
  '/',
  (req: Request, res: Response, next: express.NextFunction): void => {
    // GET route code here
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

module.exports = router;

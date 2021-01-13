import nodemailer from 'nodemailer';
import cron from 'node-cron';
import pool from '../modules/pool';

// CronJob
cron.schedule('40 * * * * *', () => {
  console.log('running every forty seconds');
  const queryText = `SELECT * FROM "postings" WHERE "date_to_attend" < $1 AND "date_to_attend" > $2;`;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 2);
  console.log(today, maxDate);

  pool
    .query(queryText, [maxDate, today])
    .then((dbResponse) => {
      console.log(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

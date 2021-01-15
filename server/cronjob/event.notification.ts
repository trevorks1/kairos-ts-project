import nodemailer from 'nodemailer';
import cron from 'node-cron';
import pool from '../modules/pool';

// Function for event notifications
function eventNotifications() {
  // NODEMAILER config
  const transportConfig = {
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_EMAIL_PASS,
    },
  };
  console.log(transportConfig);
  let transporter = nodemailer.createTransport(transportConfig);

  // CronJob

  // * * 23 * * * -- Myron suggests this config for once every 24 hrs
  cron.schedule('0 */24 * * *', () => {
    console.log('running every forty seconds');
    const queryText = `SELECT * FROM "postings" WHERE "date_to_attend" < $1 AND "date_to_attend" > $2;`;

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);
    console.log(today, maxDate);

    pool
      .query(queryText, [maxDate, today])
      .then((dbResponse) => {
        const allUserPromises = [];
        for (let i = 0; i < dbResponse.rows.length; i++) {
          const eventItem = dbResponse.rows[i];
          const queryUser = `SELECT * FROM "user" 
        JOIN "posting_volunteers" ON "user".id = "posting_volunteers".user_id 
        JOIN "postings" ON "posting_volunteers".posting_id = "postings".id
        JOIN "organization" ON "postings".org_id = "organization".id 
        WHERE "postings".id = $1;`;
          console.log(eventItem);
          allUserPromises.push(pool.query(queryUser, [eventItem.id]));
        }
        Promise.all(allUserPromises)
          .then((dbResponse) => {
            for (let i = 0; i < dbResponse.length; i++) {
              const eventUsers = dbResponse[i];
              console.log(eventUsers.rows);
              for (let i = 0; i < eventUsers.rows.length; i++) {
                const userEventInfo = eventUsers.rows[i];
                console.log('are we getting anything?', userEventInfo);

                const mailOptions = {
                  from: process.env.MAILER_EMAIL, // sender address
                  to: userEventInfo.email_address, // list of receivers
                  subject: 'Hello, you are being reminded of an event.', // Subject line
                  html: `<div><h1>See you at the event! ${userEventInfo.organization_name}.</h1> 
                <h2>${userEventInfo.date_to_attend} ${userEventInfo.start_time}. 
                Organized by ${userEventInfo.organization_name}.</h2> 
                <p>Dear ${userEventInfo.username}, Thank you for signing up to volunteer with our organization.</p>
                </div>`, // plain text body
                };
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err != null) {
                    console.log(err);
                    return;
                  }
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

export default eventNotifications;

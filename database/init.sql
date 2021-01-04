-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );


CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
  "first_name" VARCHAR (40),
  "last_name" VARCHAR (40),
  "email_address" VARCHAR (40),
  "phone_number" VARCHAR (40),
  "company" BOOLEAN,
  "company_name" VARCHAR (40),
  "non_profit" BOOLEAN,
  "active" BOOLEAN,
  "access_level_id" INT
);

CREATE TABLE "access_level" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR (20),
  "access_level" INT
);

CREATE TABLE "organization" (
  "id" SERIAL PRIMARY KEY,
  "organization_name" VARCHAR (80),
  "contact_title" VARCHAR (80),
  "address" VARCHAR (100),
  "mission" VARCHAR (2000),
  "summary" VARCHAR (5000),
  "website" VARCHAR (60),
  "organization_type" VARCHAR (40),
  "user_id" INT
);

CREATE TABLE "causes" (
  "id" SERIAL PRIMARY KEY,
  "cause" VARCHAR (40)
);

CREATE TABLE "org_causes" (
  "id" SERIAL PRIMARY KEY,
  "org_id" INT,
  "cause_id" INT
);

CREATE TABLE "postings" (
  "id" SERIAL PRIMARY KEY,
  "org_id" INT,
  "date_posted" date,
  "date_to_attend" date,
  "start_time" VARCHAR (20),
  "end_time" VARCHAR (20),
  "location" VARCHAR (80),
  "description" VARCHAR (1000),
  "repeating" BOOLEAN,
  "frequency" VARCHAR (40),
  "people_needed" INT,
  "active" BOOLEAN
);

CREATE TABLE "ages" (
  "id" SERIAL PRIMARY KEY,
  "range" VARCHAR (40)
);

CREATE TABLE "posting_ages" (
  "id" SERIAL PRIMARY KEY,
  "posting_id" INT,
  "ages_id" INT
);

CREATE TABLE "user_ages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "ages_id" INT
);

CREATE TABLE "group" (
  "id" SERIAL PRIMARY KEY,
  "number_of_people" INT
);

CREATE TABLE "group_members" (
  "id" SERIAL PRIMARY KEY,
  "group_id" INT,
  "member_name" VARCHAR (40),
  "email" VARCHAR (40),
  "age_id" INT,
  "waiver_signed" BOOLEAN
);

CREATE TABLE "posting_volunteers" (
  "id" SERIAL PRIMARY KEY,
  "posting_id" INT,
  "user_id" INT,
  "group_id" INT,
  "waiver_agreement" BOOLEAN
);

CREATE TABLE "activity_type" (
  "id" SERIAL PRIMARY KEY,
  "activity_name" VARCHAR (80)
);

CREATE TABLE "posting_activity" (
  "id" SERIAL PRIMARY KEY,
  "posting_id" INT,
  "activity_type_id" INT
);

CREATE TABLE "user_activity" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "activity_type_id" INT
);

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "organization" ("user_id");

ALTER TABLE "organization" ADD FOREIGN KEY ("id") REFERENCES "org_causes" ("org_id");

ALTER TABLE "causes" ADD FOREIGN KEY ("id") REFERENCES "org_causes" ("cause_id");

ALTER TABLE "postings" ADD FOREIGN KEY ("id") REFERENCES "posting_ages" ("posting_id");

ALTER TABLE "ages" ADD FOREIGN KEY ("id") REFERENCES "posting_ages" ("ages_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_ages" ("user_id");

ALTER TABLE "ages" ADD FOREIGN KEY ("id") REFERENCES "user_ages" ("ages_id");

ALTER TABLE "postings" ADD FOREIGN KEY ("id") REFERENCES "posting_volunteers" ("posting_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "posting_volunteers" ("user_id");

ALTER TABLE "group" ADD FOREIGN KEY ("id") REFERENCES "posting_volunteers" ("group_id");

ALTER TABLE "postings" ADD FOREIGN KEY ("id") REFERENCES "posting_activity" ("posting_id");

ALTER TABLE "activity_type" ADD FOREIGN KEY ("id") REFERENCES "posting_activity" ("activity_type_id");

ALTER TABLE "organization" ADD FOREIGN KEY ("id") REFERENCES "postings" ("org_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_activity" ("user_id");

ALTER TABLE "activity_type" ADD FOREIGN KEY ("id") REFERENCES "user_activity" ("activity_type_id");

ALTER TABLE "access_level" ADD FOREIGN KEY ("id") REFERENCES "user" ("access_level_id");

ALTER TABLE "group" ADD FOREIGN KEY ("id") REFERENCES "group_members" ("group_id");

ALTER TABLE "ages" ADD FOREIGN KEY ("id") REFERENCES "group_members" ("age_id");

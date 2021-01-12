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
  "password" VARCHAR (1000) NOT NULL,
  "first_name" VARCHAR (40),
  "last_name" VARCHAR (40),
  "email_address" VARCHAR (40),
  "phone_number" VARCHAR (40),
  "company" BOOLEAN,
  "company_name" VARCHAR (40),
  "volunteer" BOOLEAN,
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
  "logo" VARCHAR (1000),
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

ALTER TABLE "organization" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "org_causes" ADD FOREIGN KEY ("org_id") REFERENCES "organization" ("id");

ALTER TABLE "org_causes" ADD FOREIGN KEY ("cause_id") REFERENCES "causes" ("id");

ALTER TABLE "posting_ages" ADD FOREIGN KEY ("posting_id") REFERENCES "postings" ("id");

ALTER TABLE "posting_ages" ADD FOREIGN KEY ("ages_id") REFERENCES "ages" ("id");

ALTER TABLE "user_ages" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_ages" ADD FOREIGN KEY ("ages_id") REFERENCES "ages" ("id");

ALTER TABLE "posting_volunteers" ADD FOREIGN KEY ("posting_id") REFERENCES "postings" ("id");

ALTER TABLE "posting_volunteers" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "posting_volunteers" ADD FOREIGN KEY ("group_id") REFERENCES "group" ("id");

ALTER TABLE "posting_activity" ADD FOREIGN KEY ("posting_id") REFERENCES "postings" ("id");

ALTER TABLE "posting_activity" ADD FOREIGN KEY ("activity_type_id") REFERENCES "activity_type" ("id");

ALTER TABLE "postings" ADD FOREIGN KEY ("org_id") REFERENCES "organization" ("id");

ALTER TABLE "user_activity" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_activity" ADD FOREIGN KEY ("activity_type_id") REFERENCES "activity_type" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("access_level_id") REFERENCES "access_level" ("id");

ALTER TABLE "group_members" ADD FOREIGN KEY ("group_id") REFERENCES "group" ("id");

ALTER TABLE "group_members" ADD FOREIGN KEY ("age_id") REFERENCES "ages" ("id");

alter table  "organization"
drop constraint organization_user_id_fkey,
add constraint organization_user_id_fkey 
	foreign key ("user_id")
	references "user"(id)
	ON DELETE CASCADE;

alter table  "org_causes"
drop constraint org_causes_org_id_fkey,
add constraint org_causes_org_id_fkey 
	foreign key ("org_id")
	references "organization"(id)
	ON DELETE CASCADE;
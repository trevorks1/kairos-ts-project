INSERT INTO "activity_type" ("activity_name")
VALUES ('Arts & Crafts'),
('Canvassing'),
('Cleaning'),
('Dog Walking'),
('Event Help'),
('Gardening'),
('Landscaping'),
('Litter Pickup'),
('Moving'),
('Other'),
('Packing'),
('Painting'),
('Reading'),
('Sorting');

INSERT INTO "ages" ("range")
VALUES ('0-4'),
('5-12'),
('13-17'),
('Adult'),
('Adult 55+'),
('Prefer not to say');

INSERT INTO "causes" ("cause")
VALUES ('Animals & Pets'),
('Arts & Music'),
('Children & Youth'),
('Colleges & Universities'),
('Domestic Violence'),
('Education & Literacy'),
('Environment'),
('Food & Nutrition'),
('Health & Substance Abuse'),
('Healthcare'),
('Homelessness & Housing'),
('Immigrants & Refugees'),
('Job Training & Employment'),
('Media & Journalism'),
('Re-entry & Criminal Justice'),
('Seniors & Caregivers'),
('Sports & Recreation');

INSERT INTO "access_level" ("title", "access_level")
VALUES ('Admin', 10),
('Organization', 20),
('Volunteer', 30);

INSERT INTO "user" ("username", "password", "first_name", "last_name", "email_address", "phone_number", "company", "company_name", "volunteer", "active", "access_level_id") 
VALUES ('tommy', '$2a$10$4mBT3./JmnTWb.7pNqS4XuRsBlgbdgXE.0RnDRJtqe38Le.3ddI7K', 'Tom', 'Bombadil', 'tom.bombadil@theshire.com', '(555)555-1234', true, 'Kairos', false, true, 1),
('frodo', '$2a$10$4mBT3./JmnTWb.7pNqS4XuRsBlgbdgXE.0RnDRJtqe38Le.3ddI7K', 'Frodo', 'Baggins', 'frodo.baggins@theshire.com', '(555)555-1235', true, 'Kairos', true, true, 3),
('merry', '$2a$10$4mBT3./JmnTWb.7pNqS4XuRsBlgbdgXE.0RnDRJtqe38Le.3ddI7K', 'Merry', 'Brandybuck', 'merry.brandybuck@theshire.com', '(555)555-1236', true, 'Kairos', true, true, 3),
('gandalf', '$2a$10$4mBT3./JmnTWb.7pNqS4XuRsBlgbdgXE.0RnDRJtqe38Le.3ddI7K', 'Gandalf', 'White', 'gandalf.white@theshire.com', '(555)555-1237', true, 'Kairos', false, true, 2),
('smeagol', '$2a$10$4mBT3./JmnTWb.7pNqS4XuRsBlgbdgXE.0RnDRJtqe38Le.3ddI7K', 'Smeagol', 'Gollum', 'smeagol.gollum@theshire.com', '(555)555-1238', true, 'Kairos', false, true, 2),
('treebeard', '$2a$10$4mBT3./JmnTWb.7pNqS4XuRsBlgbdgXE.0RnDRJtqe38Le.3ddI7K', 'Treebeard', 'Fangorn', 'treebeard.fangorn@theshire.com', '(555)555-1239', true, 'Kairos', false, true, 2);

INSERT INTO "user_activity" ("activity_type_id", "user_id")
VALUES (1, 2),
(2, 2),
(3, 2),
(7, 2),
(8, 2),
(1, 3),
(4, 3),
(5, 3),
(9, 3),
(11, 3);

INSERT INTO "user_ages" ("user_id", "ages_id")
VALUES (2, 1),
(2, 3),
(2, 5),
(3, 2),
(3, 4);

INSERT INTO "organization" ("organization_name", "contact_title", "address", "mission", "summary", "website", "organization_type", "user_id")
VALUES ('The Prancing Pony', 'Wizard', '1 White Wizard Way, White Tower, Middle earth 77777', 'Make money, drink beer, smoke the shire herb', 'Its an Inn, what do you want?', 'prancingpony.com', 'Other', 4),
('Saurons Smithing', 'CEO', '1 Evil Wizard Way, Some Tower, Middle earth 77777', 'Kill hobbits, build armies, smoke the shire herb', 'All the evil', 'brokesmithy.org', 'Non-profit', 5),
('Shelobs Spin Class & Yoga', 'PR Manager', 'A cave in the forest, Middle earth 77777', 'Be flexible, lots of spinning, avoid the light', 'Best hobbit smoothies in the world', 'livehealthy.net', 'Community Group', 5);

INSERT INTO "org_causes" ("org_id", "cause_id")
VALUES (1, 2),
(1, 3),
(1, 5),
(1, 6),
(2, 5),
(2, 7),
(2, 8),
(2, 9),
(3, 1),
(3, 2),
(3, 7),
(3, 9),
(3, 10),
(3, 13);

INSERT INTO "postings" ("org_id", "date_posted", "date_to_attend", "start_time", "end_time", "location", "description", "repeating", "frequency", "people_needed", "active")
VALUES (1, '2021-01-04', '2021-01-09', '12:30', '4:30', 'Shire', 'Help pack Frodos house', false, '', 6, true),
(1, '2021-01-04', '2021-01-09', '4:30', '7:00', 'Shire', 'Setup Frodo going away party', false, '', 6, true),
(2, '2021-01-04', '2021-01-09', '6:00am', '7:00pm', 'Fores', 'Clearing the forest', false, '', 400, true),
(3, '2021-01-04', '2021-01-09', '12:00', '12:00', 'The cave', 'Making smoothies for charity', true, 'Once a week', 25, true);

INSERT INTO "posting_activity" ("posting_id", "activity_type_id")
VALUES (1, 1),
(1, 3),
(1, 5),
(2, 1),
(2, 8),
(2, 11),
(3, 2),
(3, 9),
(3, 11),
(4, 4),
(4, 7);

INSERT INTO "posting_ages" ("posting_id", "ages_id")
VALUES (1, 3),
(1, 4),
(1, 5),
(2, 3),
(2, 4),
(2, 5),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5);



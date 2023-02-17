CREATE TABLE IF NOT EXISTS `users` (
  `sl` double NOT NULL,
  `password` text NOT NULL,
  `active` double NOT NULL,
  `privilege` double NOT NULL,
  `email` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `org_id` double NOT NULL,
  `branch` double NOT NULL
) ;

ALTER TABLE `users` ADD PRIMARY KEY( `sl`);
ALTER TABLE `users` CHANGE `sl` `user_id` DOUBLE NOT NULL;
ALTER TABLE `users` ADD `landing_page` TEXT NOT NULL AFTER `branch`;
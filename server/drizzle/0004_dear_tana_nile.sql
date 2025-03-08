ALTER TABLE `vendors` DROP FOREIGN KEY `vendors_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `vendors` ADD `userId` longtext;--> statement-breakpoint
ALTER TABLE `vendors` ADD CONSTRAINT `vendors_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vendors` DROP COLUMN `user_id`;
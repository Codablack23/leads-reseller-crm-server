CREATE TABLE `riders` (
	`id` longtext NOT NULL,
	`name` longtext,
	`user_id` longtext,
	`logo` text,
	`banner` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `riders_id` PRIMARY KEY(`id`),
	CONSTRAINT `riders_id_unique` UNIQUE(`id`),
	CONSTRAINT `riders_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` longtext NOT NULL,
	`name` longtext,
	`vendor_id` longtext,
	`has_rider` boolean DEFAULT false,
	`logo` text,
	`banner` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `stores_id` PRIMARY KEY(`id`),
	CONSTRAINT `stores_id_unique` UNIQUE(`id`),
	CONSTRAINT `stores_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` longtext NOT NULL,
	`firstname` longtext,
	`lastname` longtext,
	`password` longtext,
	`roles` longtext,
	`phone_number` text,
	`dob` date,
	`email` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` longtext NOT NULL,
	`name` longtext,
	`description` longtext,
	`region` longtext,
	`user_id` longtext,
	`logo` text,
	`banner` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `vehicles_id` PRIMARY KEY(`id`),
	CONSTRAINT `vehicles_id_unique` UNIQUE(`id`),
	CONSTRAINT `vehicles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `vendors` DROP INDEX `vendors_vendor_id_unique`;--> statement-breakpoint
ALTER TABLE `vendors` MODIFY COLUMN `id` longtext NOT NULL;--> statement-breakpoint
ALTER TABLE `vendors` ADD CONSTRAINT `vendors_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `vendors` ADD `user_id` longtext;--> statement-breakpoint
ALTER TABLE `riders` ADD CONSTRAINT `riders_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stores` ADD CONSTRAINT `stores_vendor_id_vendors_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vendors` ADD CONSTRAINT `vendors_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vendors` DROP COLUMN `vendor_id`;--> statement-breakpoint
ALTER TABLE `vendors` DROP COLUMN `phone_number`;--> statement-breakpoint
ALTER TABLE `vendors` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `vendors` DROP COLUMN `category`;
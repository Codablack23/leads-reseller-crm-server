CREATE TABLE `vendor` (
	`id` longtext NOT NULL,
	`name` longtext,
	`userId` longtext,
	`logo` text,
	`banner` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `vendor_id` PRIMARY KEY(`id`),
	CONSTRAINT `vendor_id_unique` UNIQUE(`id`),
	CONSTRAINT `vendor_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
DROP TABLE `vendors`;--> statement-breakpoint
ALTER TABLE `stores` DROP FOREIGN KEY `stores_vendor_id_vendors_id_fk`;
--> statement-breakpoint
ALTER TABLE `stores` ADD CONSTRAINT `stores_vendor_id_vendor_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor`(`id`) ON DELETE no action ON UPDATE no action;
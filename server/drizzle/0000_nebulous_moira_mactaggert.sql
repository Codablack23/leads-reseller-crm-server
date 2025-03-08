CREATE TABLE `dishes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` longtext,
	`vendor_id` text,
	`promotion_id` text,
	`category` text,
	`banner` text,
	`price` decimal,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deletedAt` timestamp,
	CONSTRAINT `dishes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `promotions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` longtext,
	`vendor_id` text,
	`promotion_id` text,
	`description` text,
	`discount_rate` text,
	`start_date` date,
	`end_date` date,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `promotions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vendors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` longtext,
	`vendor_id` text,
	`phone_number` text,
	`email` text,
	`category` text,
	`logo` text,
	`banner` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `vendors_id` PRIMARY KEY(`id`),
	CONSTRAINT `vendors_name_unique` UNIQUE(`name`),
	CONSTRAINT `vendors_vendor_id_unique` UNIQUE(`vendor_id`)
);

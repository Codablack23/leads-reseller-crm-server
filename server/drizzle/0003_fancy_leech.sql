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

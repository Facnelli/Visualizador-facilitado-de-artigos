CREATE TABLE `highlights` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`article_id` text NOT NULL,
	`block_id` text NOT NULL,
	`start_offset` integer NOT NULL,
	`end_offset` integer NOT NULL,
	`quote` text NOT NULL,
	`color` text DEFAULT 'yellow' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reading_progress` (
	`user_id` text NOT NULL,
	`article_id` text NOT NULL,
	`desktop_page` integer DEFAULT 0 NOT NULL,
	`mobile_page` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `article_id`)
);

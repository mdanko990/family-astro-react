CREATE TABLE `persons` (
	`id` integer PRIMARY KEY NOT NULL,
	`firstname` text,
	`patronym` text,
	`lastname` text,
	`birth_id` integer NOT NULL,
	`death_id` integer NOT NULL,
	`marriage_id` integer NOT NULL,
	`is_draft` integer,
	FOREIGN KEY (`birth_id`) REFERENCES `stories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`death_id`) REFERENCES `stories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`marriage_id`) REFERENCES `stories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` integer,
	`place` text,
	`type` text,
	`person_id` integer NOT NULL,
	FOREIGN KEY (`person_id`) REFERENCES `persons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `comments`;
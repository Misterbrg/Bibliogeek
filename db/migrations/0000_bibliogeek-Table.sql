CREATE TABLE `maison_d_edition` (
	`ID_Maison` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name_Maison` text(100) NOT NULL,
	`Photo_Profil_Maison` text
);
--> statement-breakpoint
CREATE TABLE `jeu` (
	`ID_Game` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name_Game` text NOT NULL,
	`Date_Parution_Game` text,
	`Description_Game` text,
	`ID_Maison` integer,
	FOREIGN KEY (`ID_Maison`) REFERENCES `maison_d_edition`(`ID_Maison`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `utilisateur` (
	`ID_Users` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nom_Users` text NOT NULL,
	`Prenom_Users` text NOT NULL,
	`Pseudo_Users` text NOT NULL,
	`Mail_Users` text NOT NULL,
	`MDP_Users` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`ID_Tag` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name_Tag` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `jeu_tag` (
	`ID_Game` integer,
	`ID_Tag` integer,
	PRIMARY KEY(`ID_Game`, `ID_Tag`),
	FOREIGN KEY (`ID_Game`) REFERENCES `jeu`(`ID_Game`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ID_Tag`) REFERENCES `tag`(`ID_Tag`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `note_jeu` (
	`ID_Users` integer,
	`ID_Game` integer,
	`Notation` integer,
	`Commentaire` text,
	PRIMARY KEY(`ID_Users`, `ID_Game`),
	FOREIGN KEY (`ID_Users`) REFERENCES `utilisateur`(`ID_Users`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ID_Game`) REFERENCES `jeu`(`ID_Game`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `like_tag` (
	`ID_Users` integer,
	`ID_Tag` integer,
	`Favori` integer,
	PRIMARY KEY(`ID_Users`, `ID_Tag`),
	FOREIGN KEY (`ID_Users`) REFERENCES `utilisateur`(`ID_Users`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ID_Tag`) REFERENCES `tag`(`ID_Tag`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `suit_maison` (
	`ID_Users` integer,
	`ID_Maison` integer,
	PRIMARY KEY(`ID_Users`, `ID_Maison`),
	FOREIGN KEY (`ID_Users`) REFERENCES `utilisateur`(`ID_Users`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ID_Maison`) REFERENCES `maison_d_edition`(`ID_Maison`) ON UPDATE no action ON DELETE cascade
);

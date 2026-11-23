// Tables Drizzle : jeux, editeurs, tags, utilisateurs + tables de liaison.
const {sql} = require("drizzle-orm");
const {sqliteTable, integer, text} = require("drizzle-orm/sqlite-core");

const Maison_d_Edition = sqliteTable("Maison_d_Edition", {
    ID_Maison: integer("ID_Maison").primaryKey({autoIncrement: true}),
    Name_Maison: text("Name_Maison").notNull(),
    Photo_Profil_Maison: text("Photo_Profil_Maison").notNull(),
    Nbr_Abonnee_Maison: integer("Nbr_Abonnee_Maison").notNull(),
    Date_Creation_Maison: integer("Date_Creation_Maison", { mode: "timestamp" }).notNull(),
});

const Jeu = sqliteTable("Jeu", {
    ID_Game: integer("ID_Game").primaryKey({autoIncrement: true}),
    Name_Game: text("Name_Game").notNull(),
    Description_Game: text("Description_Game").notNull(),
    Date_Parrution_Game: integer("Date_Parution_Game", { mode: "timestamp" }).notNull(),
    Maison_Edition_Game: integer("Maison_Edition_Game").references(() => Maison_d_Edition.ID_Maison),
});

const Tag = sqliteTable("Tag", {
    ID_Tag: integer("ID_Tag").primaryKey({autoIncrement: true}),
    Name_Tag: text("Name_Tag").notNull(),
    Nbr_Like_Tag: integer("Nbr_Like_Tag").notNull(),
});

const Utilisateur = sqliteTable("Utilisateur", {
    ID_User: integer("ID_User").primaryKey({autoIncrement: true}),
    Name_User: text("Name_User").notNull().unique(),
    Nom_User: text("Nom_User").notNull(),
    Prenom_User: text("Prenom_User").notNull(),
    Email_User: text("Email_User").notNull(),
    Password_User: text("Password_User").notNull(),
    Photo_Profil_User: text("Photo_Profil_User").notNull(),
    Nbr_Abonnement_User: integer("Nbr_Abonnement_User").notNull(),
    Nbr_Favorite_User: integer("Nbr_Favorite_User").notNull(),
});

const Un_Utilisateur_Like_LEJEU = sqliteTable("Un_Utilisateur_Like_LEJEU", {
    ID_Like: integer("ID_Like").primaryKey({autoIncrement: true}),
    ID_User: integer("ID_User").references(() => Utilisateur.ID_User),
    ID_Game: integer("ID_Game").references(() => Jeu.ID_Game),
    note: integer("note").notNull(),
    commentaire: text("commentaire"),
    date: integer("date", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

const Le_Jeu_a_unTHEME = sqliteTable("Le_Jeu_a_unTHEME", {
    ID_Theme: integer("ID_Theme").primaryKey({autoIncrement: true}),
    ID_Game: integer("ID_Game").references(() => Jeu.ID_Game),
    Name_Theme: text("Name_Theme").notNull(),
});

const Une_Maison_a_un_jeu = sqliteTable("Une_Maison_a_un_jeu", {
    ID_Maison: integer("ID_Maison").references(() => Maison_d_Edition.ID_Maison),
    ID_Game: integer("ID_Game").references(() => Jeu.ID_Game),
});

const Utilisateur_suit_Maison = sqliteTable("Utilisateur_suit_Maison", {
    ID_Abonnee: integer("ID_Abonnee").primaryKey({autoIncrement: true}),
    ID_User: integer("ID_User").references(() => Utilisateur.ID_User),
    ID_Maison: integer("ID_Maison").references(() => Maison_d_Edition.ID_Maison),
});

const Un_Utilisateur_Like_UNTAG = sqliteTable("Un_Utilisateur_Like_UNTAG", {
    ID_Like: integer("ID_Like").primaryKey({autoIncrement: true}),
    ID_User: integer("ID_User").references(() => Utilisateur.ID_User),
    ID_Tag: integer("ID_Tag").references(() => Tag.ID_Tag),
});





module.exports = { Maison_d_Edition, Jeu, Tag, Utilisateur, Un_Utilisateur_Like_LEJEU, Le_Jeu_a_unTHEME, Une_Maison_a_un_jeu, Utilisateur_suit_Maison, Un_Utilisateur_Like_UNTAG};
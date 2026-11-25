// src/db/schema.js
const {sql} = require("drizzle-orm");
const { sqliteTable, integer, text, primaryKey } = require("drizzle-orm/sqlite-core");

const maison = sqliteTable("maison_d_edition", {
  id: integer("ID_Maison").primaryKey({ autoIncrement: true }),
  nom: text("Name_Maison", { length: 100 }).notNull(),
  photo: text("Photo_Profil_Maison"),
});

const jeu = sqliteTable("jeu", {
  id: integer("ID_Game").primaryKey({ autoIncrement: true }),
  nom: text("Name_Game").notNull(),
  date: text("Date_Parution_Game"),            // "2024-05-12"
  description: text("Description_Game"),
  maisonId: integer("ID_Maison").references(() => maison.id), // (1,1) => notNull si tu veux
});

const tag = sqliteTable("tag", {
  id: integer("ID_Tag").primaryKey({ autoIncrement: true }),
  nom: text("Name_Tag").notNull(),
});

const utilisateur = sqliteTable("utilisateur", {
  id: integer("ID_Users").primaryKey({ autoIncrement: true }),
  nom: text("Nom_Users").notNull(),
  prenom: text("Prenom_Users").notNull(),
  pseudo: text("Pseudo_Users").notNull(),
  mail: text("Mail_Users").notNull(),
  mdp: text("MDP_Users").notNull(),
});

const jeuTag = sqliteTable("jeu_tag", {
  jeuId: integer("ID_Game").references(() => jeu.id, { onDelete: "cascade" }),
  tagId: integer("ID_Tag").references(() => tag.id, { onDelete: "cascade" }),
}, (t) => [primaryKey({ columns: [t.jeuId, t.tagId] })]);

const noteJeu = sqliteTable("note_jeu", {
  userId: integer("ID_Users").references(() => utilisateur.id),
  jeuId: integer("ID_Game").references(() => jeu.id, { onDelete: "cascade" }),
  notation: integer("Notation"),
  commentaire: text("Commentaire"),
}, (t) => [primaryKey({ columns: [t.userId, t.jeuId] })]);

const likeTag = sqliteTable("like_tag", {
  userId: integer("ID_Users").references(() => utilisateur.id),
  tagId: integer("ID_Tag").references(() => tag.id),
  favori: integer("Favori"),
}, (t) => [primaryKey({ columns: [t.userId, t.tagId] })]);

const suitMaison = sqliteTable("suit_maison", {
  userId: integer("ID_Users").references(() => utilisateur.id),
  maisonId: integer("ID_Maison").references(() => maison.id, { onDelete: "cascade" }),
}, (t) => [primaryKey({ columns: [t.userId, t.maisonId] })]);

module.exports = { maison, jeu, utilisateur, tag, jeuTag, noteJeu, likeTag, suitMaison};
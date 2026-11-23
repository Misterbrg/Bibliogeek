import { sqliteTable, integer, text, real, primaryKey } from 'drizzle-orm/sqlite-core';

// ---------- Entités ----------

export const editeurs = sqliteTable('editeurs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nom: text('nom').notNull(),
  photo: text('photo'), // chemin vers public/images/editeurs/...
});

export const jeux = sqliteTable('jeux', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titre: text('titre').notNull(),
  dateParution: text('date_parution'), // format AAAA-MM-JJ
  note: real('note').default(0), // 0 à 5 étoiles
  editeurId: integer('editeur_id').references(() => editeurs.id, { onDelete: 'set null' }), // 1 jeu -> 1 éditeur
});

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nom: text('nom').notNull().unique(),
});

export const utilisateurs = sqliteTable('utilisateurs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nom: text('nom'),
  prenom: text('prenom'),
  pseudo: text('pseudo').notNull().unique(),
  email: text('email').notNull().unique(),
  motDePasse: text('mot_de_passe').notNull(), // à stocker hashé, jamais en clair
  photo: text('photo'),
});

// ---------- Tables de liaison (relations N,N) ----------
// Les compteurs du sujet (nb de favoris, de likes, d'abonnés) se calculent
// avec un COUNT sur ces tables : pas besoin de colonnes dédiées.

export const jeuxTags = sqliteTable('jeux_tags', {
  jeuId: integer('jeu_id').notNull().references(() => jeux.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (t) => [primaryKey({ columns: [t.jeuId, t.tagId] })]);

export const jeuxFavoris = sqliteTable('jeux_favoris', {
  utilisateurId: integer('utilisateur_id').notNull().references(() => utilisateurs.id, { onDelete: 'cascade' }),
  jeuId: integer('jeu_id').notNull().references(() => jeux.id, { onDelete: 'cascade' }),
}, (t) => [primaryKey({ columns: [t.utilisateurId, t.jeuId] })]);

export const tagsFavoris = sqliteTable('tags_favoris', {
  utilisateurId: integer('utilisateur_id').notNull().references(() => utilisateurs.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (t) => [primaryKey({ columns: [t.utilisateurId, t.tagId] })]);

export const abonnements = sqliteTable('abonnements', {
  utilisateurId: integer('utilisateur_id').notNull().references(() => utilisateurs.id, { onDelete: 'cascade' }),
  editeurId: integer('editeur_id').notNull().references(() => editeurs.id, { onDelete: 'cascade' }),
}, (t) => [primaryKey({ columns: [t.utilisateurId, t.editeurId] })]);

// Avis (note étoile + commentaire) d'un utilisateur sur un jeu
export const avis = sqliteTable('avis', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  utilisateurId: integer('utilisateur_id').notNull().references(() => utilisateurs.id, { onDelete: 'cascade' }),
  jeuId: integer('jeu_id').notNull().references(() => jeux.id, { onDelete: 'cascade' }),
  etoiles: integer('etoiles').notNull(), // 0 à 5
  commentaire: text('commentaire'),
});

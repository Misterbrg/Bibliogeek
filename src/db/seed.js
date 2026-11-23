// Remplit la base avec des données de départ : npm run seed
import { db } from './index.js';
import { editeurs, jeux, tags, jeuxTags } from './schema.js';

async function seed() {
  // On vide les tables (ordre : liaisons d'abord)
  await db.delete(jeuxTags);
  await db.delete(jeux);
  await db.delete(tags);
  await db.delete(editeurs);

  const [sega] = await db.insert(editeurs).values({ nom: 'Sega' }).returning();
  const [aventure] = await db.insert(tags).values({ nom: 'Aventure' }).returning();
  const [jeu] = await db.insert(jeux).values({
    titre: 'Sonic Frontiers', dateParution: '2022-11-08', note: 4, editeurId: sega.id,
  }).returning();
  await db.insert(jeuxTags).values({ jeuId: jeu.id, tagId: aventure.id });

  // TODO : ajouter d'autres jeux, tags, utilisateurs, favoris...
  console.log('Seed terminé');
}

seed();

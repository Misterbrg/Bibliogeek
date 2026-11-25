// Route de la page d'accueil (/).
import { Router } from "express";
import { eq, avg, count, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { jeu, noteJeu, tag, jeuTag, likeTag } from "../db/schema.js";

const router = Router();

router.get("/", async (req, res) => {
  // Meilleurs jeux (notes moyennes)
  const meilleurs = await db
    .select({ id: jeu.id, nom: jeu.nom, note: avg(noteJeu.notation), nbAvis: count(noteJeu.notation) })
    .from(jeu)
    .innerJoin(noteJeu, eq(noteJeu.jeuId, jeu.id))
    .groupBy(jeu.id)
    .orderBy(desc(avg(noteJeu.notation)))
    .limit(6).all();

  // Tags les plus likés
  const tagsPopulaires = await db
    .select({ id: tag.id, nom: tag.nom, likes: count(likeTag.userId) })
    .from(tag)
    .leftJoin(likeTag, eq(likeTag.tagId, tag.id))
    .groupBy(tag.id)
    .orderBy(desc(count(likeTag.userId)))
    .limit(5).all();

  res.render("accueil", { meilleurs, tagsPopulaires });
});

export default router;
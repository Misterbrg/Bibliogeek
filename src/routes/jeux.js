// Routes des jeux (/jeux) : F1 création, F2 liste, F3 détail, F4 modification, F5 suppression.
import { Router } from "express";
import { eq, avg, count } from "drizzle-orm";
import { db } from "../db/index.js";
import { jeu, maison, tag, jeuTag, noteJeu } from "../db/schema.js";

const router = Router();

// F2 : liste
router.get("/", async (req, res) => {
  const jeux = await db
    .select({
      id: jeu.id, nom: jeu.nom, date: jeu.date,
      maison: maison.nom,
      note: avg(noteJeu.notation),
    })
    .from(jeu)
    .leftJoin(maison, eq(jeu.maisonId, maison.id))
    .leftJoin(noteJeu, eq(noteJeu.jeuId, jeu.id))
    .groupBy(jeu.id)
    .all();
  res.render("jeux/liste", { jeux });
});

// F1 : formulaire de création (AVANT /:id sinon "nouveau" serait pris pour un id)
router.get("/nouveau", async (req, res) => {
  res.render("jeux/formulaire", {
    titre: "Ajouter un jeu",
    action: "/jeux",
    maisons: await db.select().from(maison).all(),
    tags: await db.select().from(tag).all(),
  });
});

// F1 : traitement du formulaire
router.post("/", async (req, res) => {
  const { nom, date, description, maisonId } = req.body;
  const tagIds = [].concat(req.body.tags ?? []);          // 0, 1 ou N cases cochées
  const [cree] = await db.insert(jeu)
    .values({ nom, date, description, maisonId: Number(maisonId) })
    .returning();
  if (tagIds.length)
    await db.insert(jeuTag).values(tagIds.map((t) => ({ jeuId: cree.id, tagId: Number(t) })));
  res.redirect(`/jeux/${cree.id}`);
});

// F3 : détail
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [j] = await db.select().from(jeu).where(eq(jeu.id, id));
  if (!j) return res.status(404).send("Jeu introuvable");
  const [editeur] = await db.select().from(maison).where(eq(maison.id, j.maisonId));
  const tags = await db.select({ id: tag.id, nom: tag.nom })
    .from(jeuTag).innerJoin(tag, eq(jeuTag.tagId, tag.id)).where(eq(jeuTag.jeuId, id));
  const avis = await db.select().from(noteJeu).where(eq(noteJeu.jeuId, id));
  res.render("jeux/detail", { jeu: j, editeur, tags, avis });
});

// F4 : modification (formulaire pré-rempli puis enregistrement)
router.get("/:id/modifier", async (req, res) => {
  const id = Number(req.params.id);
  const [j] = await db.select().from(jeu).where(eq(jeu.id, id));
  const tagsDuJeu = (await db.select().from(jeuTag).where(eq(jeuTag.jeuId, id))).map((x) => x.tagId);
  const tags = (await db.select().from(tag).all()).map((t) => ({ ...t, coche: tagsDuJeu.includes(t.id) }));
  const maisons = (await db.select().from(maison).all()).map((m) => ({ ...m, choisie: m.id === j.maisonId }));
  res.render("jeux/formulaire", { titre: "Modifier", action: `/jeux/${id}/modifier`, jeu: j, tags, maisons });
});

router.post("/:id/modifier", async (req, res) => {
  const id = Number(req.params.id);
  const { nom, date, description, maisonId } = req.body;
  await db.update(jeu).set({ nom, date, description, maisonId: Number(maisonId) }).where(eq(jeu.id, id));
  await db.delete(jeuTag).where(eq(jeuTag.jeuId, id));    // on remplace les relations
  const tagIds = [].concat(req.body.tags ?? []);
  if (tagIds.length)
    await db.insert(jeuTag).values(tagIds.map((t) => ({ jeuId: id, tagId: Number(t) })));
  res.redirect(`/jeux/${id}`);
});

// F5 : suppression
router.post("/:id/supprimer", async (req, res) => {
  await db.delete(jeu).where(eq(jeu.id, Number(req.params.id)));
  res.redirect("/jeux");
});

export default router;
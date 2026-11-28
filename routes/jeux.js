const express = require("express");
const { eq } = require("drizzle-orm");
const db = require("../db");
const { maison, jeu, tag, jeuTag } = require("../db/schema");

const router = express.Router();

// Liste des jeux
router.get("/", async (req, res) => {
    try {
        const games = await db
            .select({
                id: jeu.id,
                nom: jeu.nom,
                date: jeu.date,
                description: jeu.description,
                maisonId: jeu.maisonId,
                maison: maison.nom,
            })
            .from(jeu)
            .leftJoin(maison, eq(jeu.maisonId, maison.id));

        res.render("jeux/index", { games });
    } catch (error) {
        console.error(error);
        res.status(500).render("error", { status: 500, message: "Erreur interne du serveur" });
    }
});

// Détail d'un jeu
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(404).render("error", { status: 404, message: "Jeu introuvable" });
        }

        const [game] = await db.select().from(jeu).where(eq(jeu.id, id));
        if (!game) {
            return res.status(404).render("error", { status: 404, message: "Jeu introuvable" });
        }

        const [editeur] = await db
            .select({ id: maison.id, nom: maison.nom })
            .from(maison)
            .where(eq(maison.id, game.maisonId));

        const tags = await db
            .select({ id: tag.id, nom: tag.nom })
            .from(jeuTag)
            .innerJoin(tag, eq(jeuTag.tagId, tag.id))
            .where(eq(jeuTag.jeuId, id));

        res.render("jeux/detail", { game, editeur, tags });
    } catch (error) {
        console.error(error);
        res.status(500).render("error", { status: 500, message: "Erreur interne du serveur" });
    }
});

module.exports = router;
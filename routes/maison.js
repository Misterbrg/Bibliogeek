const express = require("express");
const db = require("../db/index");
const {maison, suitMaison, jeu} = require("../db/schema");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const Houses = await db.select().from(maison);
        res.render("views/maison/liste", {Houses});
    } catch(error){
        console.error(error);
        res.status(500).render("error", { status: 500, message: "Erreur interne du serveur" });
    }
});

router.get("/:id", async (req, res) => {
    try{
    const id = Number(req.params.id);
    const publisher = await db.select().from(maison).where(eq(maison.id, id));

    const games = await db.select().from(jeu).where(eq(jeu.maisonId, id));

    const followers = await db.select({ followers: count() }).from(suitMaison).where(eq(suitMaison.maisonId, id));
    res.render("views/maison/detail", { publisher, games, followers });
    }catch(error){
        console.error(error);
        res.status(500).render("error", { status: 500, message: "Erreur interne du serveur" });
    }
});

module.exports = router;
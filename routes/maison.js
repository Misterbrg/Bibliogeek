const db = require("../db/index");
const {bibliogeek} = require("../db/schema");
const app = express();

// 1. Liste des maisons (GET /maisons)
router.get("/", async (req, res) => {
    try {
        const maisons = await db.select().from(maisonDEditionTable);
        res.render("maison/liste", {
            title: "Nos Maisons d'Édition",
            maisons,
        });
    } catch (error) {
        console.error("Erreur liste maisons :", error);
        res.status(500).send("Erreur serveur");
    }
});

// 2. Détail d'une maison (GET /maisons/:id)
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [maison] = await db
            .select()
            .from(maisonDEditionTable)
            .where(eq(maisonDEditionTable.idMaison, id));


        res.render("maison/detail", {
            title: maison.nameMaison,
            maison,
        });
    } catch (error) {
        console.error("Erreur détail maison :", error);
    }
});

module.exports = app;
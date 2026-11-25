const db = require("../db/index");
const {bibliogeek} = require("../db/schema");
const app = express();
const {desc} = require("drizzle-orm");

router.get("/", async (req, res) => {
    try {
        const listeJeux = await db
            .select({
                idGame: jeuTable.idGame,
                nameGame: jeuTable.nameGame,
                dateParution: jeuTable.dateParutionGame,
                nomMaison: maisonDEditionTable.nameMaison,
                noteGeneral: vueNoteJeu.noteGeneral,
            })
            .from(jeuTable)
            .leftJoin(maisonDEditionTable, eq(jeuTable.idMaison, maisonDEditionTable.idMaison))
            .leftJoin(vueNoteJeu, eq(jeuTable.idGame, vueNoteJeu.idGame));

        res.render("jeux/liste", {
            title: "Catalogue des Jeux",
            jeux: listeJeux,
        });
    } catch (error) {
        console.error("Erreur liste jeux :", error);
        res.status(500).send("Erreur serveur");
    }
});

// 2. Détail d'un jeu spécifique (GET /jeux/:id)
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [resultat] = await db
            .select()
            .from(jeuTable)
            .leftJoin(maisonDEditionTable, eq(jeuTable.idMaison, maisonDEditionTable.idMaison))
            .where(eq(jeuTable.idGame, id));


        res.render("jeux/detail", {
            title: resultat.jeu.nameGame,
            jeu: resultat.jeu,
            maison: resultat.maison_d_edition,
        });
    } catch (error) {
        console.error("Erreur détail jeu :", error);
    }
});

module.exports = app;
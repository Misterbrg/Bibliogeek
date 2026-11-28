const db = require("../db/index");
const {bibliogeek} = require("../db/schema");
const app = express();

app.get("/", async (req, res) => {
    try{
        const meilleurGame = await db.select().from(bibliogeek).orderBy(desc(bibliogeek.noteGeneral));
        res.render("accueil", {
            titre: "Accueil - Bibliogeek",
            meilleurGame,
        });
    } catch(error) {
        console.error("Erreur chargement accueil :", error);
    }
});
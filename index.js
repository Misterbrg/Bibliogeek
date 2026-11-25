// Point d'entrée : créer le serveur Express, configurer Handlebars,
// les fichiers statiques (public/) et brancher les routes de src/routes/.
const express = require("express");
const app = express();
const PORT = 8080;


app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
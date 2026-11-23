// Point d'entrée : créer le serveur Express, configurer Handlebars,
// les fichiers statiques (public/) et brancher les routes de src/routes/.
const express = require('express');
const path = require('path');
const hbs = require("hbs");

const app = express();
const port = 3000;

// Configurer le moteur de template Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'
));

router.get('/', (req, res) => {
    res.send ("Liste de jeux");
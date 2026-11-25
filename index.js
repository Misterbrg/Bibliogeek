// Point d'entrée : créer le serveur Express, configurer Handlebars,
// les fichiers statiques (public/) et brancher les routes de src/routes/.
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const {db} = require("src/db/schema");



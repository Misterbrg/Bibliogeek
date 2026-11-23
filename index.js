import 'dotenv/config';
import express from 'express';
import hbs from 'hbs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import accueilRouter from './src/routes/accueil.js';
import jeuxRouter from './src/routes/jeux.js';
import editeursRouter from './src/routes/editeurs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Moteur de templates Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Fichiers statiques (CSS, JS, images) + lecture des formulaires
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', accueilRouter);
app.use('/jeux', jeuxRouter);
app.use('/editeurs', editeursRouter);

// Page 404
app.use((req, res) => res.status(404).render('404', { titre: 'Page introuvable' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bibliogeek lancé sur http://localhost:${PORT}`));

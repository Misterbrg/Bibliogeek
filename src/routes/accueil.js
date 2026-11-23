import { Router } from 'express';
// import { db } from '../db/index.js';

const router = Router();

// Page d'accueil : jeux mis en avant (meilleures notes / plus de likes)
router.get('/', async (req, res) => {
  // TODO : récupérer les jeux les mieux notés avec Drizzle
  res.render('accueil', { titre: 'Accueil', jeuxPopulaires: [] });
});

export default router;

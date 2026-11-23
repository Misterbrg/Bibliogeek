import { Router } from 'express';
// import { db } from '../db/index.js';
// import { jeux, jeuxTags } from '../db/schema.js';

const router = Router();

// F2 - Liste des jeux
router.get('/', async (req, res) => {
  res.render('jeux/liste', { titre: 'Les jeux', jeux: [] });
});

// F1 - Formulaire de création
router.get('/nouveau', (req, res) => {
  res.render('jeux/formulaire', { titre: 'Ajouter un jeu', action: '/jeux' });
});

// F1 - Enregistrement d'un nouveau jeu
router.post('/', async (req, res) => {
  // TODO : insérer req.body dans la table jeux (+ ses tags)
  res.redirect('/jeux');
});

// F3 - Détail d'un jeu (avec éditeur et tags)
router.get('/:id', async (req, res) => {
  res.render('jeux/detail', { titre: 'Détail du jeu', jeu: null });
});

// F4 - Formulaire de modification
router.get('/:id/modifier', async (req, res) => {
  res.render('jeux/formulaire', { titre: 'Modifier le jeu', action: `/jeux/${req.params.id}/modifier` });
});

// F4 - Enregistrement des modifications
router.post('/:id/modifier', async (req, res) => {
  res.redirect(`/jeux/${req.params.id}`);
});

// F5 - Suppression
router.post('/:id/supprimer', async (req, res) => {
  res.redirect('/jeux');
});

export default router;

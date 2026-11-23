import { Router } from 'express';
// import { db } from '../db/index.js';
// import { editeurs, jeux } from '../db/schema.js';

const router = Router();

// F7 - Liste des maisons d'édition
router.get('/', async (req, res) => {
  res.render('editeurs/liste', { titre: "Les maisons d'édition", editeurs: [] });
});

// F6 - Formulaire de création
router.get('/nouveau', (req, res) => {
  res.render('editeurs/formulaire', { titre: "Ajouter une maison d'édition", action: '/editeurs' });
});

// F6 - Enregistrement d'une nouvelle maison d'édition
router.post('/', async (req, res) => {
  // TODO : insérer req.body dans la table editeurs
  res.redirect('/editeurs');
});

// F8 - Détail d'une maison d'édition (avec ses jeux)
router.get('/:id', async (req, res) => {
  res.render('editeurs/detail', { titre: "Détail de la maison d'édition", editeur: null });
});

// F9 - Formulaire de modification
router.get('/:id/modifier', async (req, res) => {
  res.render('editeurs/formulaire', { titre: "Modifier la maison d'édition", action: `/editeurs/${req.params.id}/modifier` });
});

// F9 - Enregistrement des modifications
router.post('/:id/modifier', async (req, res) => {
  res.redirect(`/editeurs/${req.params.id}`);
});

// F10 - Suppression
router.post('/:id/supprimer', async (req, res) => {
  res.redirect('/editeurs');
});

export default router;

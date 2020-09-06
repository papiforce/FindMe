'use strict';

const express = require('express');
const router = express.Router();
const service = require('./user.service');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/current', getCurrent);
router.post('/register', register);
router.post('/auth', auth);
router.delete('/:id', _delete);

function getAll(req, res, next) {
  service.getAll()
  .then(users => res.json(users))
  .catch(err => next(err));
}

function getById(req, res, next) {
  service.getById(req.params.id)
  .then(user => user ? res.status(200).json({message: "Utilisateur trouvé", data: user}) : res.status(500).json({message: "Utilisateur inexistant!"}))
  .catch(err => next(err));
}

function getCurrent(req, res, next) {
  service.getById(req.user.sub)
  .then(user => user ? res.status(200).json({message: "Utilisateur trouvé", data: user}) : res.status(500).json({message: "Utilisateur inexistant!"}))
  .catch(err => next(err));
}

function register(req, res, next) {
  service.create(req.body)
  .then(() => res.json({}))
  .catch(err => next(err));
}

function auth(req, res, next) {
  service.auth(req.body)
  .then(user => user ? res.status(200).json({auth: true, message: "Connecté!", data: user}) : res.status(500).json({auth: false, message: "Pseudo ou mot de passe incorrect!"}))
}

function _delete(req, res, next) {
  service.delete(req.params.id)
  .then(() => res.json({message: "Produit supprimé!"}))
  .catch(err => next(err));
}

module.exports = router;

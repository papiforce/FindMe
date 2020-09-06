'use strict';

const express = require('express');
const router = express.Router();
const service = require('./product.service');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', _delete);

function getAll(req, res, next) {
  service.getAll()
  .then(products => res.json(products))
  .catch(err => next(err));
}

function getById(req, res, next) {
  service.getById(req.params.id)
  .then(product => product ? res.status(200).json({message: "Produit trouvé!", data: product}) : res.status(500).json({message: "Produit introuvable!"}))
  .catch(err => next(err));
}

function add(req, res, next) {
  service.create(req.body)
  .then(() => res.json({}))
  .catch(err => next(err));
}

function update(req, res, next) {
  service.update(req.params.id, req.body)
  .then(() => res.json({}))
  .catch(err => next(err));
}

function _delete(req, res, next) {
  service.delete(req.params.id)
  .then(() => res.json({}))
  .catch(err => next(err));
}

module.exports = router;

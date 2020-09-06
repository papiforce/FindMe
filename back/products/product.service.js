'use strict';

const config = require('../config/config.json');
const db = require('_helpers/db');
const Product = db.Product;

async function getAll() {
  return await Product.find().sort({'_id': 1});
}

async function getById(id) {
  return await Product.findById(id);
}

async function create(param) {
  if(await Product.findOne({name: param.name})) {
    throw `Le produit "${param.name}" existe déjà dans la collection!`;
  }

  const product = new Product(param);

  await product.save();
}

async function update(id, param) {
  const product = await Product.findById(id);

  if(!product) throw `Produit introuvable!`;
  if(product.name !== param.name && await Product.findOne({name: param.name})) {
    throw `Le produit "${param.name}" existe déjà dans la collection!`;
  }

  Object.assign(product, param);

  await product.save();
}

async function _delete(id) {
  await Product.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

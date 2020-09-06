'use strict';

const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

async function getAll() {
  return await User.find().sort({'_id': 1});
}

async function getById(id) {
  return await User.findById(id);
}

async function create(param) {
  if(await User.findOne({username: param.username})) {
    throw `Le pseudo "${param.username}" est déjà utilisé!`;
  }

  if(await User.findOne({email: param.email})) {
    throw `L'email "${param.email}" est déjà utilisé!`;
  }

  const user = new User(param);

  if(param.password) {
    user.password = bcrypt.hashSync(param.password, 10);
  }

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

async function auth({username, password}) {
  const user = await User.findOne({username});

  if(user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({sub: user.id}, config.secret, {expiresIn: '7d'});
    return {
      ...user.toJSON(),
      token
    };
  }
}

module.exports = {
  getAll,
  getById,
  create,
  delete: _delete,
  auth
};

'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique:true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'USER' },
  createdDate: { type: Date, default: Date.now }
});

autoIncrement.initialize(mongoose.connection);

schema.plugin(autoIncrement.plugin, 'user');

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('User', schema);

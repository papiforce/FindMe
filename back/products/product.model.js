'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  price: {type: Number, required: true},
  rating: {type: Number, required: true},
  warranty_years: {type: Number, required: true},
  available: {type: Boolean, default: true}
});

autoIncrement.initialize(mongoose.connection);

schema.plugin(autoIncrement.plugin, 'product');

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Products', schema);

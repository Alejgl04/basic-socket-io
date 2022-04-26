
const { Schema, model } = require('mongoose');

const GotySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  url: {
    type: String,
  },
  votos: {
    type: Number,
  },
});

module.exports = model( 'Goty', GotySchema );
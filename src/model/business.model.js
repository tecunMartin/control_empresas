const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const EMPRESAS = Schame({
  name: String,
  email: String,
  password: String,
  direction: String,
});

module.exports = mongoose.model('empresas', EMPRESAS);

const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const EMPLOYEES = Schame({
  name: String,
  stall: String,
  department: String,
  business: { type: mongoose.Schema.ObjectId, ref: 'empresas' },
});

module.exports = mongoose.model('empleados', EMPLOYEES);

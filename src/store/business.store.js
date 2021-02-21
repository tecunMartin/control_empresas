const model = require('../model/employees.model');
const modelEmpresa = require('../model/business.model');

async function list(id_empresas) {
  return model.find({ business: id_empresas }).populate('business', 'name');
}

async function createEmployees(empleado) {
  const newEmployees = new model(empleado);
  return await newEmployees.save();
}

async function findEmployees(business, idEmpleado) {
  return await model.findOne({ _id: idEmpleado, business });
}

async function updataEmployees(idEmpleado, body) {
  return await model.findByIdAndUpdate(idEmpleado, body, { new: true });
}

async function updateEmpresa(idEmpresa, body) {
  return await modelEmpresa.findByIdAndUpdate(idEmpresa, body, { new: true });
}

async function deleteEmpleado(idEmpleado) {
  return await model.findByIdAndDelete(idEmpleado);
}

async function findQuery(objectQuery) {
  return await model.find(objectQuery);
}

async function findQueryID(id, business) {
  return await model.findOne({ _id: id, business });
}

module.exports = {
  list,
  createEmployees,
  findEmployees,
  updataEmployees,
  updateEmpresa,
  deleteEmpleado,
  findQuery,
  findQueryID,
};

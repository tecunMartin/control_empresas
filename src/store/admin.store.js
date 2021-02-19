const model = require('../model/business.model');

async function list() {
  return await model.find();
}

async function buscarEmpresa(nameEmpresa, emailEmpresa) {
  return await model.find({ $or: [{ name: nameEmpresa }, { email: emailEmpresa }] });
}

function guardarEmpresa(empresaNueva) {
  const mynuevaEmpresa = new model(empresaNueva);
  return mynuevaEmpresa.save();
}

async function updateEmpresa(id, body) {
  return await model.findByIdAndUpdate(id, body, { new: true });
}

async function deleteEmpresa(id) {
  return await model.findOneAndDelete({
    _id: id,
  });
}

module.exports = {
  list,
  buscarEmpresa,
  guardarEmpresa,
  updateEmpresa,
  removeEmpresa: deleteEmpresa,
};

const model = require('../model/employees.model');

async function list() {
  return await model.find();
}

module.exports = {
  list,
};

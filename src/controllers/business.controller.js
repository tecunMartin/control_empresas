const store = require('../store/business.store');

async function listarUsuarios() {
  return store.list;
}

module.exports = {
  listarUsuarios,
};

const store = require('../store/business.store');

async function listarUsuarios() {
  return await store.list();
}

module.exports = {
  listarUsuarios,
};

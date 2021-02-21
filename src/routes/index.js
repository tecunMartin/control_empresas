/* Componentes */
const business = require('./business.network');
const admin = require('./admin.network');
const auth = require('./auth.network');

const routes = (app) => {
  app.use('/admin', admin);
  app.use('/empresas', business);
  app.use('/auth', auth);
};

module.exports = routes;

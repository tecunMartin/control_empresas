/* Componentes */
const business = require('./business.network');
const employees = require('./employees.network');
const admin = require('./admin.network');

const routes = (app) => {
  app.use('/admin', admin);
  app.use('/empresas', business);
  app.use('/empleados', employees);
};

module.exports = routes;

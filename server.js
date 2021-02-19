const mongoose = require('mongoose');
const chalk = require('chalk');
const app = require('./app');
const ADMIN = require('./src/model/admin.model');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/controlEmpresas', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  const PORT = 3000;
  app.listen(PORT, () => console.log(chalk.bgGreenBright.black(`Escuchando http://localhost:${PORT}`)));

  ADMIN.find({}, (err, adminEncontrado) => {
    if (err) return console.log('Error en la creacion de administrador.');
    if (adminEncontrado.length > 0) {
      return console.log(chalk.bgRedBright.whiteBright('El administrador ya existe'));
    } else {
      const adminModel = new ADMIN();
      adminModel.userName = 'admin';
      adminModel.email = 'admin123@gmail.com';
      adminModel.password = '123456';

      adminModel.save((err, datoGuardado) => {
        if (err) return console.log('Error a la hora de guardar administrador.');
        !datoGuardado ? console.log('No viene el dato de admin') : console.log(chalk.bgBlueBright.black('Administrador creado con exito.'));
      });
    }
  });
});

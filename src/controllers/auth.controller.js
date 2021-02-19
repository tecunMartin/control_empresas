const bcrypt = require('bcrypt-nodejs');
const { findWithEmail } = require('../store/auth.store');
const RESPONSE = require('../utils/response');
const jwt = require('../utils/jwt');

async function login(req, res) {
  const { email, password } = req.body;

  await findWithEmail(email)
    .then((empresaEncontrada) => {
      if (empresaEncontrada) {
        bcrypt.compare(password, empresaEncontrada.password, (err, passDesincriptado) => {
          if (err) return RESPONSE.error(req, res, err, 500);
          !passDesincriptado
            ? RESPONSE.error(req, res, 'La contraseña es incorrecta.')
            : RESPONSE.success(req, res, jwt.createToken(empresaEncontrada), 200);
        });
      } else {
        return RESPONSE.error(req, res, 'El correo es incorrecto', 404);
      }
    })
    .catch((err) => console.log('err', err));
}

module.exports = {
  login,
};

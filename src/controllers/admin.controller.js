const bcrypt = require('bcrypt-nodejs');
/* Importaciones personales */
const {
  list,
  buscarEmpresa,
  guardarEmpresa,
  updateEmpresa: update,
  removeEmpresa,
  buscarEmpresaId,
  eliminarEmpleados,
} = require('../store/admin.store');
const RESPONSE = require('../utils/response');

async function obtenerEmpresas() {
  return await list();
}

async function crearEmpresas(req, res) {
  const { name, email, password, direction } = req.body;
  if (email && password && name) {
    const empresaNueva = {
      name,
      email,
      direction,
    };

    buscarEmpresa(empresaNueva.name, empresaNueva.email)
      .then((empresaEncontrada) => {
        if (empresaEncontrada && empresaEncontrada.length >= 1) {
          return RESPONSE.error(req, res, 'Ya existe una empresa.', 404);
        } else {
          bcrypt.hash(password, null, null, (err, passEncriptado) => {
            empresaNueva.password = passEncriptado;
            if (err) {
              console.log(err);
              return RESPONSE.error(req, res, 'ERROR INTERNO', 500);
            }
            guardarEmpresa(empresaNueva)
              .then((empresaCreada) => {
                return RESPONSE.success(req, res, empresaCreada, 201);
              })
              .catch((err) => {
                console.log(err);
                return RESPONSE.error(req, res, 'ERROR INTERNO', 500);
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return RESPONSE.error(req, res, 'Error al encontrar la empresa', 500);
      });
  } else {
    return RESPONSE.error(req, res, 'Algun dato hace falta', 404);
  }
}

async function updateEmpresa(req, res) {
  const idEmpresa = req.params.idEmpresa;
  const empresaParametros = req.body;
  delete empresaParametros.password;

  buscarEmpresaId(idEmpresa)
    .then((empresEncontrada) => {
      if (empresEncontrada) {
        update(idEmpresa, empresaParametros)
          .then((empresaModificada) => {
            return RESPONSE.success(req, res, empresaModificada, 200);
          })
          .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
          });
      } else {
        return RESPONSE.error(req, res, 'Empresa no existente.', 404);
      }
    })
    .catch((err) => RESPONSE.error(req, res, 'Error interno', 500));
}

async function deleteEmpresa(req, res) {
  const idEmpresa = req.params.idEmpresa;
  removeEmpresa(idEmpresa)
    .then((empresaEliminada) => {
      eliminarEmpleados(empresaEliminada._id).then((empresaEliminadaEmpleado) => {
        if (empresaEliminadaEmpleado) {
          return RESPONSE.success(req, res, 'Empresa eliminada con exito!!', 200);
        } else {
          return RESPONSE.error(req, res, 'Esta empresa no existe!!', 404);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.err(req, res, 'Error interno', 500);
    });
}

module.exports = {
  obtenerEmpresas,
  crearEmpresas,
  updateEmpresa,
  deleteEmpresa,
};

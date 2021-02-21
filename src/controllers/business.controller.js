const {
  list,
  createEmployees,
  findEmployees,
  updataEmployees,
  updateEmpresa,
  deleteEmpleado: removeEmployees,
  findQuery,
  findQueryID,
} = require('../store/business.store');
const RESPONSE = require('../utils/response');

async function listarUsuarios(req, res) {
  const query = req.query;

  if (Object.entries(query).length === 0) {
    list(req.empresa.sub)
      .then((empleadosEncontrados) => {
        return RESPONSE.success(req, res, empleadosEncontrados, 200);
      })
      .catch((err) => {
        console.log(err);
        return RESPONSE.error(req, res, 'Error interno', 500);
      });
  } else {
    query.business = req.empresa.sub;
    console.log('query', query);

    if (query.id) {
      findQueryID(query.id, req.empresa.sub).then((empleadoEncontrado) => {
        if (empleadoEncontrado) {
          return RESPONSE.success(req, res, empleadoEncontrado, 200);
        } else {
          return RESPONSE.error(req, res, 'No existe este usuario en tu empresa.');
        }
      });
    }

    findQuery(query).then((empleadoEncontrado) => {
      if (empleadoEncontrado) {
        console.log('empleadoEncontrado', empleadoEncontrado);
        return RESPONSE.success(req, res, empleadoEncontrado, 200);
      } else {
        return RESPONSE.error(req, res, 'No se puede encontrar este empleado.', 500);
      }
    });
  }
}

async function createUser(req, res) {
  const { name, stall, department } = req.body;

  const empleado = {
    name,
    stall,
    department,
    business: req.empresa.sub,
  };

  createEmployees(empleado)
    .then((empleadoCreado) => {
      return RESPONSE.success(req, res, empleadoCreado, 201);
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function updateEmpleados(req, res) {
  const idEmpleado = req.params.idEmpleado;
  findEmployees(req.empresa.sub, idEmpleado)
    .then((empleadoEncontrado) => {
      if (!empleadoEncontrado) {
        return RESPONSE.error(req, res, 'El empleado no es de esta empresa', 404);
      } else {
        const parametros = req.body;
        delete parametros.business;
        delete parametros.password;
        updataEmployees(idEmpleado, parametros)
          .then((usuarioModificado) => RESPONSE.success(req, res, usuarioModificado, 200))
          .catch((err) => {
            console.log(err);
            ESPONSE.error(req, res, 'Error a la hora de encontrar el empleado', 500);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error en la busqueda');
    });
}

async function updateMe(req, res) {
  const idEmpresa = req.params.idEmpresa;
  if (!(idEmpresa === req.empresa.sub)) {
    return RESPONSE.error(req, res, 'No puedes modificar otra empresa solo a ti mismo.');
  } else {
    const parametros = req.body;
    updateEmpresa(idEmpresa, parametros)
      .then((empresaModifica) => RESPONSE.success(req, res, empresaModifica, 200))
      .catch((err) => RESPONSE.error(req, res, 'Error interno', 500));
  }
}

async function deleteEmpleado(req, res) {
  const idEmpleado = req.params.idEmpleado;

  findEmployees(req.empresa.sub, idEmpleado)
    .then((empleadoEncontrado) => {
      if (empleadoEncontrado) {
        removeEmployees(idEmpleado).then((data) => {
          console.log('data', data);
          return RESPONSE.success(req, res, 'Empleado eliminado con exito!!', 200);
        });
      } else {
        return RESPONSE.error(req, res, 'No puede eliminar este usuario.', 404);
      }
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

module.exports = {
  listarUsuarios,
  createUser,
  updateEmpleados,
  updateMe,
  deleteEmpleado,
};

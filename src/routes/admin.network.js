const express = require('express');
const router = express.Router();
/* Importaciones personales. */
const RESPONSE = require('../utils/response');
const { obtenerEmpresas, crearEmpresas, updateEmpresa, deleteEmpresa } = require('../controllers/admin.controller');

/* Listar empresas */
router.get('/', (req, res) => {
  obtenerEmpresas()
    .then((users) => {
      RESPONSE.success(req, res, users, 200);
    })
    .catch((err) => {
      RESPONSE.error(req, res, err, 500);
    });
});
/* Agregar empresas */
router.post('/create', crearEmpresas);
/* Modificar empresas */
router.put('/update/:idEmpresa', updateEmpresa);
/* Eliminar empresa */
router.delete('/delete/:idEmpresa', deleteEmpresa);

module.exports = router;

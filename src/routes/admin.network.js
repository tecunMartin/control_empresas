const express = require('express');
const router = express.Router();
/* Importaciones personales. */
const RESPONSE = require('../utils/response');
const { obtenerEmpresas, crearEmpresas, updateEmpresa, deleteEmpresa } = require('../controllers/admin.controller');
const { verifyAuth } = require('../utils/verify-auth');

/* Listar empresas */
router.get('/', verifyAuth, (req, res) => {
  obtenerEmpresas()
    .then((users) => {
      RESPONSE.success(req, res, users, 200);
    })
    .catch((err) => {
      RESPONSE.error(req, res, err, 500);
    });
});
/* Agregar empresas */
router.post('/create', verifyAuth, crearEmpresas);
/* Modificar empresas */
router.put('/update/:idEmpresa', verifyAuth, updateEmpresa);
/* Eliminar empresa */
router.delete('/delete/:idEmpresa', verifyAuth, deleteEmpresa);

module.exports = router;

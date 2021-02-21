const express = require('express');
const router = express.Router();
const { listarUsuarios, createUser, updateEmpleados, updateMe, deleteEmpleado } = require('../controllers/business.controller');
const { verifyAuth } = require('../utils/verify-auth');

router.get('/', verifyAuth, listarUsuarios);
router.post('/create', verifyAuth, createUser);
router.put('/update/employees/:idEmpleado', verifyAuth, updateEmpleados);
router.put('/update/me/:idEmpresa', verifyAuth, updateMe);
router.delete('/delete/:idEmpleado', verifyAuth, deleteEmpleado);

module.exports = router;

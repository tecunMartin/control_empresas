const express = require('express');
const router = express.Router();
const { listarUsuarios } = require('../controllers/business.controller');
const response = require('../utils/response');

router.get('/', (req, res) => {
  listarUsuarios()
    .then((data) => response.success(req, res, data, 200))
    .catch((e) => response.error(req, res, 'Error interno', 500, e));
});

module.exports = router;

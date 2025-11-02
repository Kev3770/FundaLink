const express = require('express');
const router = express.Router();
const {
  obtenerInformacion,
  actualizarInformacion,
  actualizarRedesSociales,
  actualizarContacto,
  actualizarRectoria
} = require('../controllers/informacion.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Ruta pública
router.get('/', obtenerInformacion);

// Rutas administrativas
router.put('/', protegerRuta, verificarRol('admin', 'superadmin'), actualizarInformacion);
router.put('/redes-sociales', protegerRuta, verificarRol('admin', 'superadmin'), actualizarRedesSociales);
router.put('/contacto', protegerRuta, verificarRol('admin', 'superadmin'), actualizarContacto);
router.put('/rectoria', protegerRuta, verificarRol('admin', 'superadmin'), actualizarRectoria);

module.exports = router;
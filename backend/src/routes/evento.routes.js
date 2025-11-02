const express = require('express');
const router = express.Router();
const {
  obtenerEventos,
  obtenerEventoPorId,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  inscribirseEvento
} = require('../controllers/evento.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Rutas públicas (sin autenticación)
router.get('/', obtenerEventos);
router.get('/:id', obtenerEventoPorId);

// Inscripción a eventos (por ahora pública, luego la protegeremos para estudiantes)
router.post('/:id/inscribirse', inscribirseEvento);

// Rutas protegidas (requieren autenticación)
// Solo admin y superadmin pueden crear, editar y eliminar
router.post('/', protegerRuta, verificarRol('admin', 'superadmin'), crearEvento);
router.put('/:id', protegerRuta, verificarRol('admin', 'superadmin'), actualizarEvento);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), eliminarEvento);

module.exports = router;
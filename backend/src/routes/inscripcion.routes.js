const express = require('express');
const router = express.Router();
const {
  crearInscripcion,
  obtenerInscripciones,
  obtenerInscripcionesPendientes,
  obtenerInscripcionPorId,
  cambiarEstadoInscripcion,
  actualizarPrioridad,
  matricularEstudiante,
  buscarInscripciones,
  cancelarInscripcion,
  obtenerEstadisticas
} = require('../controllers/inscripcion.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Ruta pública
router.post('/', crearInscripcion);

// Rutas administrativas
router.get('/', protegerRuta, verificarRol('admin', 'superadmin'), obtenerInscripciones);
router.get('/pendientes', protegerRuta, verificarRol('admin', 'superadmin'), obtenerInscripcionesPendientes);
router.get('/estadisticas', protegerRuta, verificarRol('admin', 'superadmin'), obtenerEstadisticas);
router.get('/buscar', protegerRuta, verificarRol('admin', 'superadmin'), buscarInscripciones);
router.get('/:id', protegerRuta, verificarRol('admin', 'superadmin'), obtenerInscripcionPorId);
router.put('/:id/estado', protegerRuta, verificarRol('admin', 'superadmin'), cambiarEstadoInscripcion);
router.put('/:id/prioridad', protegerRuta, verificarRol('admin', 'superadmin'), actualizarPrioridad);
router.post('/:id/matricular', protegerRuta, verificarRol('admin', 'superadmin'), matricularEstudiante);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), cancelarInscripcion);

module.exports = router;
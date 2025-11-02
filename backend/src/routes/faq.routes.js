const express = require('express');
const router = express.Router();
const {
  obtenerFAQs,
  obtenerFAQPorId,
  marcarUtil,
  obtenerTodasFAQs,
  crearFAQ,
  actualizarFAQ,
  actualizarOrden,
  toggleActivoFAQ,
  eliminarFAQ,
  buscarFAQs,
  obtenerEstadisticas
} = require('../controllers/faq.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/', obtenerFAQs);
router.get('/buscar', buscarFAQs);
router.get('/:id', obtenerFAQPorId);
router.put('/:id/valorar', marcarUtil);

// Rutas administrativas
router.get('/admin/todas', protegerRuta, verificarRol('admin', 'superadmin'), obtenerTodasFAQs);
router.get('/admin/estadisticas', protegerRuta, verificarRol('admin', 'superadmin'), obtenerEstadisticas);
router.post('/', protegerRuta, verificarRol('admin', 'superadmin'), crearFAQ);
router.put('/:id', protegerRuta, verificarRol('admin', 'superadmin'), actualizarFAQ);
router.put('/:id/orden', protegerRuta, verificarRol('admin', 'superadmin'), actualizarOrden);
router.put('/:id/toggle', protegerRuta, verificarRol('admin', 'superadmin'), toggleActivoFAQ);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), eliminarFAQ);

module.exports = router;
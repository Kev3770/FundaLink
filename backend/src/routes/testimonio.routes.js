const express = require('express');
const router = express.Router();
const {
  obtenerTestimonios,
  obtenerTestimonioPorId,
  crearTestimonio,
  obtenerTestimoniosPendientes,
  aprobarTestimonio,
  rechazarTestimonio,
  actualizarTestimonio,
  marcarDestacado,
  eliminarTestimonio,
  obtenerTodosTestimonios
} = require('../controllers/testimonio.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/', obtenerTestimonios);
router.get('/:id', obtenerTestimonioPorId);
router.post('/', crearTestimonio); // Cualquiera puede enviar testimonio

// Rutas administrativas (requieren autenticación)
router.get('/admin/todos', protegerRuta, verificarRol('admin', 'superadmin'), obtenerTodosTestimonios);
router.get('/admin/pendientes', protegerRuta, verificarRol('admin', 'superadmin'), obtenerTestimoniosPendientes);
router.put('/:id/aprobar', protegerRuta, verificarRol('admin', 'superadmin'), aprobarTestimonio);
router.put('/:id/rechazar', protegerRuta, verificarRol('admin', 'superadmin'), rechazarTestimonio);
router.put('/:id/destacado', protegerRuta, verificarRol('admin', 'superadmin'), marcarDestacado);
router.put('/:id', protegerRuta, verificarRol('admin', 'superadmin'), actualizarTestimonio);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), eliminarTestimonio);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  obtenerProgramas,
  obtenerProgramaPorId,
  obtenerProgramaPorCodigo,
  crearPrograma,
  actualizarPrograma,
  eliminarPrograma,
  marcarDestacado,
  actualizarDisponibilidad,
  obtenerProgramasDisponibles,
  obtenerTodosProgramas
} = require('../controllers/programa.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/', obtenerProgramas);
router.get('/disponibles', obtenerProgramasDisponibles);
router.get('/codigo/:codigo', obtenerProgramaPorCodigo);
router.get('/:id', obtenerProgramaPorId);

// Rutas administrativas (requieren autenticación)
router.get('/admin/todos', protegerRuta, verificarRol('admin', 'superadmin'), obtenerTodosProgramas);
router.post('/', protegerRuta, verificarRol('admin', 'superadmin'), crearPrograma);
router.put('/:id', protegerRuta, verificarRol('admin', 'superadmin'), actualizarPrograma);
router.put('/:id/destacado', protegerRuta, verificarRol('admin', 'superadmin'), marcarDestacado);
router.put('/:id/disponibilidad', protegerRuta, verificarRol('admin', 'superadmin'), actualizarDisponibilidad);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), eliminarPrograma);

module.exports = router;
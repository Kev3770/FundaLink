const express = require('express');
const router = express.Router();
const {
  registrarEstudiante,
  loginEstudiante,
  obtenerPerfilEstudiante,
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  actualizarEstudiante,
  cambiarEstadoEstudiante,
  resetearCodigoAcceso,
  desactivarEstudiante,
  buscarEstudiantes
} = require('../controllers/estudiante.controller');
const { protegerRuta, verificarRol, protegerRutaEstudiante } = require('../middlewares/auth.middleware');

// Ruta de login (pública)
router.post('/login', loginEstudiante);

// Rutas protegidas para estudiantes
router.get('/perfil', protegerRutaEstudiante, obtenerPerfilEstudiante);

// Rutas administrativas (requieren autenticación de admin)
router.post('/', protegerRuta, verificarRol('admin', 'superadmin'), registrarEstudiante);
router.get('/', protegerRuta, verificarRol('admin', 'superadmin'), obtenerEstudiantes);
router.get('/buscar', protegerRuta, verificarRol('admin', 'superadmin'), buscarEstudiantes);
router.get('/:id', protegerRuta, verificarRol('admin', 'superadmin'), obtenerEstudiantePorId);
router.put('/:id', protegerRuta, verificarRol('admin', 'superadmin'), actualizarEstudiante);
router.put('/:id/estado', protegerRuta, verificarRol('admin', 'superadmin'), cambiarEstadoEstudiante);
router.put('/:id/resetear-codigo', protegerRuta, verificarRol('admin', 'superadmin'), resetearCodigoAcceso);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), desactivarEstudiante);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  obtenerUsuarios,
  actualizarUsuario,
  cambiarPassword,
  desactivarUsuario
} = require('../controllers/usuario.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Rutas públicas
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas protegidas (requieren autenticación)
router.get('/perfil', protegerRuta, obtenerPerfil);
router.put('/cambiar-password', protegerRuta, cambiarPassword);

// Rutas de administración (solo superadmin)
router.get('/', protegerRuta, verificarRol('superadmin'), obtenerUsuarios);
router.put('/:id', protegerRuta, verificarRol('superadmin'), actualizarUsuario);
router.delete('/:id', protegerRuta, verificarRol('superadmin'), desactivarUsuario);

module.exports = router;
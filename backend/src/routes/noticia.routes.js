const express = require('express');
const router = express.Router();
const {
  obtenerNoticias,
  obtenerNoticiaPorId,
  crearNoticia,
  actualizarNoticia,
  eliminarNoticia
} = require('../controllers/noticia.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Rutas públicas (sin autenticación)
router.get('/', obtenerNoticias);
router.get('/:id', obtenerNoticiaPorId);

// Rutas protegidas (requieren autenticación)
// Solo admin y superadmin pueden crear, editar y eliminar
router.post('/', protegerRuta, verificarRol('admin', 'superadmin'), crearNoticia);
router.put('/:id', protegerRuta, verificarRol('admin', 'superadmin'), actualizarNoticia);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), eliminarNoticia);

module.exports = router;
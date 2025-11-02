const express = require('express');
const router = express.Router();
const {
  enviarMensaje,
  obtenerMensajes,
  obtenerMensajesNoLeidos,
  obtenerMensajePorId,
  marcarComoLeido,
  marcarComoImportante,
  archivarMensaje,
  responderMensaje,
  agregarNotasInternas,
  eliminarMensaje,
  buscarMensajes,
  obtenerEstadisticas,
  marcarVariosComoLeidos
} = require('../controllers/mensaje.controller');
const { protegerRuta, verificarRol } = require('../middlewares/auth.middleware');

// Ruta pública
router.post('/', enviarMensaje);

// Rutas administrativas
router.get('/', protegerRuta, verificarRol('admin', 'superadmin'), obtenerMensajes);
router.get('/no-leidos', protegerRuta, verificarRol('admin', 'superadmin'), obtenerMensajesNoLeidos);
router.get('/estadisticas', protegerRuta, verificarRol('admin', 'superadmin'), obtenerEstadisticas);
router.get('/buscar', protegerRuta, verificarRol('admin', 'superadmin'), buscarMensajes);
router.get('/:id', protegerRuta, verificarRol('admin', 'superadmin'), obtenerMensajePorId);
router.put('/:id/leido', protegerRuta, verificarRol('admin', 'superadmin'), marcarComoLeido);
router.put('/:id/importante', protegerRuta, verificarRol('admin', 'superadmin'), marcarComoImportante);
router.put('/:id/archivar', protegerRuta, verificarRol('admin', 'superadmin'), archivarMensaje);
router.put('/:id/responder', protegerRuta, verificarRol('admin', 'superadmin'), responderMensaje);
router.put('/:id/notas', protegerRuta, verificarRol('admin', 'superadmin'), agregarNotasInternas);
router.put('/marcar-leidos', protegerRuta, verificarRol('admin', 'superadmin'), marcarVariosComoLeidos);
router.delete('/:id', protegerRuta, verificarRol('admin', 'superadmin'), eliminarMensaje);

module.exports = router;
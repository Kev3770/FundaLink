const Usuario = require('../models/usuario.model');
const Estudiante = require('../models/estudiante.model');
const { verificarToken } = require('../utils/jwt.utils');

/**
 * 🔒 Proteger rutas de usuarios (admin/superadmin)
 */
const protegerRuta = async (req, res, next) => {
  try {
    let token;

    // Obtener token del header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Si no hay token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Token no proporcionado'
      });
    }

    // Verificar token
    const decoded = verificarToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        message: 'Usuario inactivo'
      });
    }

    // Agregar usuario al request
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'No autorizado',
      error: error.message
    });
  }
};

/**
 * 🧩 Verificar roles específicos (admin / superadmin)
 */
const verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario || !roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        message: `El rol ${req.usuario?.rol || 'desconocido'} no tiene permisos para esta acción`
      });
    }
    next();
  };
};

/**
 * 🎓 Proteger rutas de estudiantes
 */
const protegerRutaEstudiante = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Token no proporcionado'
      });
    }

    const decoded = verificarToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    // Buscar estudiante
    const estudiante = await Estudiante.findById(decoded.id);
    if (!estudiante) {
      return res.status(401).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    if (!estudiante.activo || estudiante.estado !== 'activo') {
      return res.status(401).json({
        success: false,
        message: 'Tu cuenta no está activa'
      });
    }

    req.estudiante = estudiante;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'No autorizado',
      error: error.message
    });
  }
};

module.exports = {
  protegerRuta,
  verificarRol,
  protegerRutaEstudiante
};

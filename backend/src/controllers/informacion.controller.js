const Informacion = require('../models/informacion.model');

// Obtener información institucional (público)
const obtenerInformacion = async (req, res) => {
  try {
    // Solo debe haber UN documento de información
    let informacion = await Informacion.findOne();

    // Si no existe, crear uno por defecto
    if (!informacion) {
      informacion = await Informacion.create({
        mision: 'Formar técnicos laborales competentes y éticos que contribuyan al desarrollo de la sociedad.',
        vision: 'Ser la institución técnica líder en formación de calidad en la región.',
        historia: 'FUNDAESTÉCNICOS fue fundada en 2000 con el objetivo de brindar educación técnica de calidad.',
        contacto: {
          direccion: 'Calle 5 # 45-32',
          telefono: '555-1234',
          email: 'info@fundaestecnicos.edu.co'
        }
      });
    }

    res.json({
      success: true,
      data: informacion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener información',
      error: error.message
    });
  }
};

// Actualizar información institucional (admin)
const actualizarInformacion = async (req, res) => {
  try {
    let informacion = await Informacion.findOne();

    if (!informacion) {
      // Crear si no existe
      informacion = await Informacion.create({
        ...req.body,
        actualizadoPor: req.usuario.id
      });
    } else {
      // Actualizar existente
      Object.assign(informacion, req.body);
      informacion.actualizadoPor = req.usuario.id;
      await informacion.save();
    }

    await informacion.populate('actualizadoPor', 'nombre apellido');

    res.json({
      success: true,
      message: 'Información actualizada exitosamente',
      data: informacion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar información',
      error: error.message
    });
  }
};

// Actualizar solo redes sociales (admin)
const actualizarRedesSociales = async (req, res) => {
  try {
    const informacion = await Informacion.findOne();

    if (!informacion) {
      return res.status(404).json({
        success: false,
        message: 'Información institucional no encontrada'
      });
    }

    informacion.redesSociales = {
      ...informacion.redesSociales,
      ...req.body
    };
    informacion.actualizadoPor = req.usuario.id;
    await informacion.save();

    res.json({
      success: true,
      message: 'Redes sociales actualizadas',
      data: informacion.redesSociales
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar redes sociales',
      error: error.message
    });
  }
};

// Actualizar solo contacto (admin)
const actualizarContacto = async (req, res) => {
  try {
    const informacion = await Informacion.findOne();

    if (!informacion) {
      return res.status(404).json({
        success: false,
        message: 'Información institucional no encontrada'
      });
    }

    informacion.contacto = {
      ...informacion.contacto,
      ...req.body
    };
    informacion.actualizadoPor = req.usuario.id;
    await informacion.save();

    res.json({
      success: true,
      message: 'Información de contacto actualizada',
      data: informacion.contacto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar contacto',
      error: error.message
    });
  }
};

// Actualizar solo rectoría (admin)
const actualizarRectoria = async (req, res) => {
  try {
    const informacion = await Informacion.findOne();

    if (!informacion) {
      return res.status(404).json({
        success: false,
        message: 'Información institucional no encontrada'
      });
    }

    informacion.rectoria = {
      ...informacion.rectoria,
      ...req.body
    };
    informacion.actualizadoPor = req.usuario.id;
    await informacion.save();

    res.json({
      success: true,
      message: 'Información de rectoría actualizada',
      data: informacion.rectoria
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar rectoría',
      error: error.message
    });
  }
};

module.exports = {
  obtenerInformacion,
  actualizarInformacion,
  actualizarRedesSociales,
  actualizarContacto,
  actualizarRectoria
};
const Noticia = require('../models/noticia.model');

// Obtener todas las noticias activas (público)
const obtenerNoticias = async (req, res) => {
  try {
    const { categoria, destacada, limit = 10, page = 1 } = req.query;
    
    const filtro = { activa: true };
    if (categoria) filtro.categoria = categoria;
    if (destacada) filtro.destacada = destacada === 'true';

    const noticias = await Noticia.find(filtro)
      .populate('creadoPor', 'nombre apellido email')
      .populate('actualizadoPor', 'nombre apellido email')
      .sort({ fechaPublicacion: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Noticia.countDocuments(filtro);

    res.json({
      success: true,
      data: noticias,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener noticias',
      error: error.message
    });
  }
};

// Obtener una noticia por ID (público)
const obtenerNoticiaPorId = async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id)
      .populate('creadoPor', 'nombre apellido email')
      .populate('actualizadoPor', 'nombre apellido email');
    
    if (!noticia || !noticia.activa) {
      return res.status(404).json({
        success: false,
        message: 'Noticia no encontrada'
      });
    }

    res.json({
      success: true,
      data: noticia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la noticia',
      error: error.message
    });
  }
};

// Crear noticia (solo administradores)
const crearNoticia = async (req, res) => {
  try {
    // Agregar el ID del usuario que crea la noticia
    const datosNoticia = {
      ...req.body,
      creadoPor: req.usuario.id,
      autor: req.body.autor || `${req.usuario.nombre} ${req.usuario.apellido}`
    };

    const nuevaNoticia = new Noticia(datosNoticia);
    await nuevaNoticia.save();

    // Poblar los datos del usuario
    await nuevaNoticia.populate('creadoPor', 'nombre apellido email');

    res.status(201).json({
      success: true,
      message: 'Noticia creada exitosamente',
      data: nuevaNoticia
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la noticia',
      error: error.message
    });
  }
};

// Actualizar noticia (solo administradores)
const actualizarNoticia = async (req, res) => {
  try {
    // Agregar el ID del usuario que actualiza
    const datosActualizar = {
      ...req.body,
      actualizadoPor: req.usuario.id
    };

    const noticiaActualizada = await Noticia.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { new: true, runValidators: true }
    )
    .populate('creadoPor', 'nombre apellido email')
    .populate('actualizadoPor', 'nombre apellido email');

    if (!noticiaActualizada) {
      return res.status(404).json({
        success: false,
        message: 'Noticia no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Noticia actualizada exitosamente',
      data: noticiaActualizada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la noticia',
      error: error.message
    });
  }
};

// Eliminar noticia (soft delete - solo administradores)
const eliminarNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.findByIdAndUpdate(
      req.params.id,
      { 
        activa: false,
        actualizadoPor: req.usuario.id
      },
      { new: true }
    );

    if (!noticia) {
      return res.status(404).json({
        success: false,
        message: 'Noticia no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Noticia eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la noticia',
      error: error.message
    });
  }
};

module.exports = {
  obtenerNoticias,
  obtenerNoticiaPorId,
  crearNoticia,
  actualizarNoticia,
  eliminarNoticia
};
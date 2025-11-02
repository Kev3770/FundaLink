const Testimonio = require('../models/testimonio.model');

// Obtener testimonios aprobados (público)
const obtenerTestimonios = async (req, res) => {
  try {
    const { destacado, programa, limit = 10, page = 1 } = req.query;
    
    // Solo mostrar testimonios aprobados y activos
    const filtro = { aprobado: true, activo: true };
    
    if (destacado) filtro.destacado = destacado === 'true';
    if (programa) filtro.programa = programa;

    const testimonios = await Testimonio.find(filtro)
      .sort({ fechaPublicacion: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Testimonio.countDocuments(filtro);

    res.json({
      success: true,
      data: testimonios,
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
      message: 'Error al obtener testimonios',
      error: error.message
    });
  }
};

// Obtener un testimonio por ID (público)
const obtenerTestimonioPorId = async (req, res) => {
  try {
    const testimonio = await Testimonio.findById(req.params.id);
    
    if (!testimonio || !testimonio.aprobado || !testimonio.activo) {
      return res.status(404).json({
        success: false,
        message: 'Testimonio no encontrado'
      });
    }

    res.json({
      success: true,
      data: testimonio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el testimonio',
      error: error.message
    });
  }
};

// Crear testimonio (público - pero requiere aprobación)
const crearTestimonio = async (req, res) => {
  try {
    const nuevoTestimonio = new Testimonio(req.body);
    await nuevoTestimonio.save();

    res.status(201).json({
      success: true,
      message: 'Testimonio enviado exitosamente. Está pendiente de aprobación por un administrador.',
      data: nuevoTestimonio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el testimonio',
      error: error.message
    });
  }
};

// Obtener testimonios pendientes de aprobación (solo admin)
const obtenerTestimoniosPendientes = async (req, res) => {
  try {
    const testimonios = await Testimonio.find({ aprobado: false, activo: true })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: testimonios,
      total: testimonios.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener testimonios pendientes',
      error: error.message
    });
  }
};

// Aprobar testimonio (solo admin)
const aprobarTestimonio = async (req, res) => {
  try {
    const testimonio = await Testimonio.findByIdAndUpdate(
      req.params.id,
      {
        aprobado: true,
        fechaAprobacion: new Date(),
        fechaPublicacion: new Date(),
        aprobadoPor: req.usuario.id
      },
      { new: true }
    ).populate('aprobadoPor', 'nombre apellido email');

    if (!testimonio) {
      return res.status(404).json({
        success: false,
        message: 'Testimonio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Testimonio aprobado exitosamente',
      data: testimonio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al aprobar el testimonio',
      error: error.message
    });
  }
};

// Rechazar testimonio (solo admin)
const rechazarTestimonio = async (req, res) => {
  try {
    const testimonio = await Testimonio.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!testimonio) {
      return res.status(404).json({
        success: false,
        message: 'Testimonio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Testimonio rechazado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al rechazar el testimonio',
      error: error.message
    });
  }
};

// Actualizar testimonio (solo admin)
const actualizarTestimonio = async (req, res) => {
  try {
    const testimonioActualizado = await Testimonio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonioActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Testimonio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Testimonio actualizado exitosamente',
      data: testimonioActualizado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el testimonio',
      error: error.message
    });
  }
};

// Marcar como destacado (solo admin)
const marcarDestacado = async (req, res) => {
  try {
    const { destacado } = req.body;

    const testimonio = await Testimonio.findByIdAndUpdate(
      req.params.id,
      { destacado },
      { new: true }
    );

    if (!testimonio) {
      return res.status(404).json({
        success: false,
        message: 'Testimonio no encontrado'
      });
    }

    res.json({
      success: true,
      message: `Testimonio ${destacado ? 'marcado' : 'desmarcado'} como destacado`,
      data: testimonio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar destacado',
      error: error.message
    });
  }
};

// Eliminar testimonio (solo admin - soft delete)
const eliminarTestimonio = async (req, res) => {
  try {
    const testimonio = await Testimonio.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!testimonio) {
      return res.status(404).json({
        success: false,
        message: 'Testimonio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Testimonio eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el testimonio',
      error: error.message
    });
  }
};

// Obtener todos los testimonios (solo admin - incluye pendientes y rechazados)
const obtenerTodosTestimonios = async (req, res) => {
  try {
    const { aprobado, activo, limit = 20, page = 1 } = req.query;
    
    const filtro = {};
    if (aprobado !== undefined) filtro.aprobado = aprobado === 'true';
    if (activo !== undefined) filtro.activo = activo === 'true';

    const testimonios = await Testimonio.find(filtro)
      .populate('aprobadoPor', 'nombre apellido email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Testimonio.countDocuments(filtro);

    res.json({
      success: true,
      data: testimonios,
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
      message: 'Error al obtener testimonios',
      error: error.message
    });
  }
};

module.exports = {
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
};
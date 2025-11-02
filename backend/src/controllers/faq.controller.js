const FAQ = require('../models/faq.model');

// Obtener todas las FAQs activas (público)
const obtenerFAQs = async (req, res) => {
  try {
    const { categoria } = req.query;
    
    const filtro = { activo: true };
    if (categoria) filtro.categoria = categoria;

    const faqs = await FAQ.find(filtro)
      .select('-creadoPor -actualizadoPor')
      .sort({ orden: 1, createdAt: 1 });

    // Agrupar por categoría
    const faqsPorCategoria = faqs.reduce((acc, faq) => {
      if (!acc[faq.categoria]) {
        acc[faq.categoria] = [];
      }
      acc[faq.categoria].push(faq);
      return acc;
    }, {});

    res.json({
      success: true,
      data: categoria ? faqs : faqsPorCategoria,
      total: faqs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener FAQs',
      error: error.message
    });
  }
};

// Obtener FAQ por ID (público)
const obtenerFAQPorId = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq || !faq.activo) {
      return res.status(404).json({
        success: false,
        message: 'FAQ no encontrada'
      });
    }

    // Incrementar contador de vistas
    faq.vistas += 1;
    await faq.save();

    res.json({
      success: true,
      data: faq
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener FAQ',
      error: error.message
    });
  }
};

// Marcar FAQ como útil (público)
const marcarUtil = async (req, res) => {
  try {
    const { util } = req.body; // true = útil, false = no útil

    const updateField = util ? { $inc: { util: 1 } } : { $inc: { noUtil: 1 } };

    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      updateField,
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Gracias por tu valoración',
      data: {
        util: faq.util,
        noUtil: faq.noUtil
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al valorar FAQ',
      error: error.message
    });
  }
};

// Obtener todas las FAQs (admin - incluye inactivas)
const obtenerTodasFAQs = async (req, res) => {
  try {
    const { activo, categoria, limit = 50, page = 1 } = req.query;
    
    const filtro = {};
    if (activo !== undefined) filtro.activo = activo === 'true';
    if (categoria) filtro.categoria = categoria;

    const faqs = await FAQ.find(filtro)
      .populate('creadoPor', 'nombre apellido')
      .populate('actualizadoPor', 'nombre apellido')
      .sort({ orden: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await FAQ.countDocuments(filtro);

    res.json({
      success: true,
      data: faqs,
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
      message: 'Error al obtener FAQs',
      error: error.message
    });
  }
};

// Crear FAQ (admin)
const crearFAQ = async (req, res) => {
  try {
    const nuevaFAQ = await FAQ.create({
      ...req.body,
      creadoPor: req.usuario.id
    });

    await nuevaFAQ.populate('creadoPor', 'nombre apellido');

    res.status(201).json({
      success: true,
      message: 'FAQ creada exitosamente',
      data: nuevaFAQ
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear FAQ',
      error: error.message
    });
  }
};

// Actualizar FAQ (admin)
const actualizarFAQ = async (req, res) => {
  try {
    const faqActualizada = await FAQ.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        actualizadoPor: req.usuario.id
      },
      { new: true, runValidators: true }
    )
      .populate('creadoPor', 'nombre apellido')
      .populate('actualizadoPor', 'nombre apellido');

    if (!faqActualizada) {
      return res.status(404).json({
        success: false,
        message: 'FAQ no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'FAQ actualizada exitosamente',
      data: faqActualizada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar FAQ',
      error: error.message
    });
  }
};

// Actualizar orden de FAQs (admin)
const actualizarOrden = async (req, res) => {
  try {
    const { orden } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { orden },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Orden actualizado',
      data: faq
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar orden',
      error: error.message
    });
  }
};

// Activar/Desactivar FAQ (admin)
const toggleActivoFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ no encontrada'
      });
    }

    faq.activo = !faq.activo;
    faq.actualizadoPor = req.usuario.id;
    await faq.save();

    res.json({
      success: true,
      message: `FAQ ${faq.activo ? 'activada' : 'desactivada'}`,
      data: faq
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message
    });
  }
};

// Eliminar FAQ (admin - eliminación física)
const eliminarFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'FAQ eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar FAQ',
      error: error.message
    });
  }
};

// Buscar FAQs (público)
const buscarFAQs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'La búsqueda debe tener al menos 3 caracteres'
      });
    }

    const faqs = await FAQ.find({
      $or: [
        { pregunta: { $regex: q, $options: 'i' } },
        { respuesta: { $regex: q, $options: 'i' } }
      ],
      activo: true
    })
      .select('-creadoPor -actualizadoPor')
      .sort({ orden: 1 })
      .limit(20);

    res.json({
      success: true,
      data: faqs,
      total: faqs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar FAQs',
      error: error.message
    });
  }
};

// Obtener estadísticas (admin)
const obtenerEstadisticas = async (req, res) => {
  try {
    const total = await FAQ.countDocuments();
    const activas = await FAQ.countDocuments({ activo: true });
    const inactivas = await FAQ.countDocuments({ activo: false });

    // FAQs por categoría
    const porCategoria = await FAQ.aggregate([
      { $match: { activo: true } },
      { $group: { _id: '$categoria', total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);

    // FAQs más vistas
    const masVistas = await FAQ.find({ activo: true })
      .select('pregunta vistas categoria')
      .sort({ vistas: -1 })
      .limit(10);

    // FAQs más útiles
    const masUtiles = await FAQ.find({ activo: true })
      .select('pregunta util noUtil categoria')
      .sort({ util: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        total,
        activas,
        inactivas,
        porCategoria,
        masVistas,
        masUtiles
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

module.exports = {
  obtenerFAQs,
  obtenerFAQPorId,
  marcarUtil,
  obtenerTodasFAQs,
  crearFAQ,
  actualizarFAQ,
  actualizarOrden,
  toggleActivoFAQ,
  eliminarFAQ,
  buscarFAQs,
  obtenerEstadisticas
};
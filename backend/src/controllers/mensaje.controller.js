const Mensaje = require('../models/mensaje.model');

// Enviar mensaje (público)
const enviarMensaje = async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje, tipo } = req.body;

    // Obtener IP del cliente
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Obtener user agent (navegador)
    const navegador = req.headers['user-agent'];

    const nuevoMensaje = await Mensaje.create({
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      tipo: tipo || 'consulta',
      ip,
      navegador
    });

    res.status(201).json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te responderemos pronto.',
      data: {
        id: nuevoMensaje._id,
        nombre: nuevoMensaje.nombre,
        email: nuevoMensaje.email,
        asunto: nuevoMensaje.asunto,
        tipo: nuevoMensaje.tipo,
        fechaEnvio: nuevoMensaje.createdAt
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al enviar el mensaje',
      error: error.message
    });
  }
};

// Obtener todos los mensajes (admin)
const obtenerMensajes = async (req, res) => {
  try {
    const { 
      leido, 
      respondido, 
      tipo, 
      importante, 
      archivado,
      limit = 20, 
      page = 1 
    } = req.query;
    
    const filtro = { activo: true };
    
    if (leido !== undefined) filtro.leido = leido === 'true';
    if (respondido !== undefined) filtro.respondido = respondido === 'true';
    if (tipo) filtro.tipo = tipo;
    if (importante !== undefined) filtro.importante = importante === 'true';
    if (archivado !== undefined) filtro.archivado = archivado === 'true';

    const mensajes = await Mensaje.find(filtro)
      .populate('respondidoPor', 'nombre apellido')
      .sort({ importante: -1, createdAt: -1 }) // Importantes primero, luego más recientes
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Mensaje.countDocuments(filtro);

    res.json({
      success: true,
      data: mensajes,
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
      message: 'Error al obtener mensajes',
      error: error.message
    });
  }
};

// Obtener mensajes no leídos (admin)
const obtenerMensajesNoLeidos = async (req, res) => {
  try {
    const mensajes = await Mensaje.find({ 
      leido: false,
      archivado: false,
      activo: true 
    })
      .sort({ importante: -1, createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: mensajes,
      total: mensajes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener mensajes no leídos',
      error: error.message
    });
  }
};

// Obtener un mensaje por ID (admin)
const obtenerMensajePorId = async (req, res) => {
  try {
    const mensaje = await Mensaje.findById(req.params.id)
      .populate('respondidoPor', 'nombre apellido email');

    if (!mensaje) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    // Marcar como leído automáticamente al abrirlo
    if (!mensaje.leido) {
      mensaje.leido = true;
      await mensaje.save();
    }

    res.json({
      success: true,
      data: mensaje
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el mensaje',
      error: error.message
    });
  }
};

// Marcar mensaje como leído (admin)
const marcarComoLeido = async (req, res) => {
  try {
    const { leido } = req.body;

    const mensaje = await Mensaje.findByIdAndUpdate(
      req.params.id,
      { leido: leido !== undefined ? leido : true },
      { new: true }
    );

    if (!mensaje) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    res.json({
      success: true,
      message: `Mensaje marcado como ${leido ? 'leído' : 'no leído'}`,
      data: mensaje
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al marcar mensaje',
      error: error.message
    });
  }
};

// Marcar mensaje como importante (admin)
const marcarComoImportante = async (req, res) => {
  try {
    const { importante } = req.body;

    const mensaje = await Mensaje.findByIdAndUpdate(
      req.params.id,
      { importante: importante !== undefined ? importante : true },
      { new: true }
    );

    if (!mensaje) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    res.json({
      success: true,
      message: `Mensaje marcado como ${importante ? 'importante' : 'normal'}`,
      data: mensaje
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al marcar mensaje',
      error: error.message
    });
  }
};

// Archivar mensaje (admin)
const archivarMensaje = async (req, res) => {
  try {
    const { archivado } = req.body;

    const mensaje = await Mensaje.findByIdAndUpdate(
      req.params.id,
      { archivado: archivado !== undefined ? archivado : true },
      { new: true }
    );

    if (!mensaje) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    res.json({
      success: true,
      message: `Mensaje ${archivado ? 'archivado' : 'restaurado'}`,
      data: mensaje
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al archivar mensaje',
      error: error.message
    });
  }
};

// Responder mensaje (admin)
const responderMensaje = async (req, res) => {
  try {
    const { respuesta } = req.body;

    if (!respuesta || respuesta.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'La respuesta debe tener mínimo 10 caracteres'
      });
    }

    const mensaje = await Mensaje.findByIdAndUpdate(
      req.params.id,
      {
        respuesta,
        respondido: true,
        respondidoPor: req.usuario.id,
        fechaRespuesta: new Date(),
        leido: true
      },
      { new: true }
    )
      .populate('respondidoPor', 'nombre apellido email');

    if (!mensaje) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    // Aquí podrías integrar un servicio de email para enviar la respuesta
    // Por ejemplo: await enviarEmail(mensaje.email, mensaje.asunto, respuesta);

    res.json({
      success: true,
      message: 'Respuesta enviada exitosamente',
      data: mensaje
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al responder mensaje',
      error: error.message
    });
  }
};

// Agregar notas internas (admin)
const agregarNotasInternas = async (req, res) => {
  try {
    const { notasInternas } = req.body;

    const mensaje = await Mensaje.findByIdAndUpdate(
      req.params.id,
      { notasInternas },
      { new: true }
    );

    if (!mensaje) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Notas internas actualizadas',
      data: mensaje
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al agregar notas',
      error: error.message
    });
  }
};

// Eliminar mensaje (admin - soft delete)
const eliminarMensaje = async (req, res) => {
  try {
    const mensaje = await Mensaje.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!mensaje) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Mensaje eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar mensaje',
      error: error.message
    });
  }
};

// Buscar mensajes (admin)
const buscarMensajes = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'La búsqueda debe tener al menos 3 caracteres'
      });
    }

    const mensajes = await Mensaje.find({
      $or: [
        { nombre: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { asunto: { $regex: q, $options: 'i' } },
        { mensaje: { $regex: q, $options: 'i' } }
      ],
      activo: true
    })
      .populate('respondidoPor', 'nombre apellido')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: mensajes,
      total: mensajes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar mensajes',
      error: error.message
    });
  }
};

// Obtener estadísticas de mensajes (admin)
const obtenerEstadisticas = async (req, res) => {
  try {
    const total = await Mensaje.countDocuments({ activo: true });
    const noLeidos = await Mensaje.countDocuments({ leido: false, activo: true });
    const noRespondidos = await Mensaje.countDocuments({ respondido: false, activo: true });
    const importantes = await Mensaje.countDocuments({ importante: true, activo: true });
    const archivados = await Mensaje.countDocuments({ archivado: true, activo: true });

    // Mensajes por tipo
    const porTipo = await Mensaje.aggregate([
      { $match: { activo: true } },
      { $group: { _id: '$tipo', total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);

    // Mensajes por mes (últimos 6 meses)
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);

    const porMes = await Mensaje.aggregate([
      { $match: { createdAt: { $gte: seisMesesAtras }, activo: true } },
      { 
        $group: { 
          _id: { 
            year: { $year: '$createdAt' }, 
            month: { $month: '$createdAt' } 
          }, 
          total: { $sum: 1 } 
        } 
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        noLeidos,
        noRespondidos,
        importantes,
        archivados,
        porTipo,
        porMes
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

// Marcar múltiples mensajes como leídos (admin)
const marcarVariosComoLeidos = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar un array de IDs'
      });
    }

    const resultado = await Mensaje.updateMany(
      { _id: { $in: ids } },
      { leido: true }
    );

    res.json({
      success: true,
      message: `${resultado.modifiedCount} mensajes marcados como leídos`,
      data: {
        modificados: resultado.modifiedCount
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al marcar mensajes',
      error: error.message
    });
  }
};

module.exports = {
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
};
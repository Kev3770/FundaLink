const Evento = require('../models/evento.model');

// Obtener todos los eventos activos (público)
const obtenerEventos = async (req, res) => {
  try {
    const { tipo, destacado, proximos, limit = 10, page = 1 } = req.query;
    
    const filtro = { activo: true };
    
    if (tipo) filtro.tipo = tipo;
    if (destacado) filtro.destacado = destacado === 'true';
    
    if (proximos === 'true') {
      filtro.fecha = { $gte: new Date() };
    }

    const eventos = await Evento.find(filtro)
      .populate('creadoPor', 'nombre apellido email')
      .populate('actualizadoPor', 'nombre apellido email')
      .sort({ fecha: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Evento.countDocuments(filtro);

    res.json({
      success: true,
      data: eventos,
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
      message: 'Error al obtener eventos',
      error: error.message
    });
  }
};

// Obtener un evento por ID (público)
const obtenerEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id)
      .populate('creadoPor', 'nombre apellido email')
      .populate('actualizadoPor', 'nombre apellido email');
    
    if (!evento || !evento.activo) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      data: evento
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el evento',
      error: error.message
    });
  }
};

// Crear evento (solo administradores)
const crearEvento = async (req, res) => {
  try {
    // Agregar el ID del usuario que crea el evento
    const datosEvento = {
      ...req.body,
      creadoPor: req.usuario.id,
      organizador: req.body.organizador || `${req.usuario.nombre} ${req.usuario.apellido}`
    };

    const nuevoEvento = new Evento(datosEvento);
    await nuevoEvento.save();

    await nuevoEvento.populate('creadoPor', 'nombre apellido email');

    res.status(201).json({
      success: true,
      message: 'Evento creado exitosamente',
      data: nuevoEvento
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el evento',
      error: error.message
    });
  }
};

// Actualizar evento (solo administradores)
const actualizarEvento = async (req, res) => {
  try {
    const datosActualizar = {
      ...req.body,
      actualizadoPor: req.usuario.id
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { new: true, runValidators: true }
    )
    .populate('creadoPor', 'nombre apellido email')
    .populate('actualizadoPor', 'nombre apellido email');

    if (!eventoActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Evento actualizado exitosamente',
      data: eventoActualizado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el evento',
      error: error.message
    });
  }
};

// Eliminar evento (soft delete - solo administradores)
const eliminarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(
      req.params.id,
      { 
        activo: false,
        actualizadoPor: req.usuario.id
      },
      { new: true }
    );

    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Evento eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el evento',
      error: error.message
    });
  }
};

// Inscribirse a un evento (estudiantes)
const inscribirseEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);

    if (!evento || !evento.activo) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    if (!evento.requiereInscripcion) {
      return res.status(400).json({
        success: false,
        message: 'Este evento no requiere inscripción'
      });
    }

    if (evento.estaLleno) {
      return res.status(400).json({
        success: false,
        message: 'El evento está lleno'
      });
    }

    if (evento.esPasado) {
      return res.status(400).json({
        success: false,
        message: 'No puedes inscribirte a un evento que ya pasó'
      });
    }

    evento.inscritosCount += 1;
    await evento.save();

    res.json({
      success: true,
      message: 'Inscripción exitosa',
      data: {
        evento: evento.nombre,
        fecha: evento.fecha,
        lugar: evento.lugar,
        inscritos: evento.inscritosCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al inscribirse al evento',
      error: error.message
    });
  }
};

module.exports = {
  obtenerEventos,
  obtenerEventoPorId,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  inscribirseEvento
};
const Inscripcion = require('../models/inscripcion.model');
const Programa = require('../models/programa.model');
const Estudiante = require('../models/estudiante.model');

// Crear solicitud de inscripción (público)
const crearInscripcion = async (req, res) => {
  try {
    const { programa, documento, email, ...datosInscripcion } = req.body;

    // Verificar que el programa existe y está disponible
    const programaExiste = await Programa.findById(programa);
    if (!programaExiste || !programaExiste.activo) {
      return res.status(400).json({
        success: false,
        message: 'Programa no válido o no disponible'
      });
    }

    if (!programaExiste.inscripcion.disponible) {
      return res.status(400).json({
        success: false,
        message: 'Las inscripciones para este programa están cerradas'
      });
    }

    // Verificar si ya hay cupos
    if (!programaExiste.tieneCupos) {
      return res.status(400).json({
        success: false,
        message: 'No hay cupos disponibles para este programa'
      });
    }

    // Verificar si ya existe una solicitud activa con el mismo documento o email
    const solicitudExistente = await Inscripcion.findOne({
      $or: [
        { 'documento.numero': documento.numero },
        { email }
      ],
      estado: { $in: ['pendiente', 'en_revision', 'aprobado'] },
      activo: true
    });

    if (solicitudExistente) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una solicitud activa con este documento o email'
      });
    }

    // Crear inscripción
    const nuevaInscripcion = await Inscripcion.create({
      ...datosInscripcion,
      documento,
      email,
      programa
    });

    await nuevaInscripcion.populate('programa', 'nombre codigo modalidad jornada');

    res.status(201).json({
      success: true,
      message: 'Solicitud de inscripción enviada exitosamente. Recibirás una respuesta en tu correo electrónico.',
      data: nuevaInscripcion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la solicitud',
      error: error.message
    });
  }
};

// Obtener todas las inscripciones (admin)
const obtenerInscripciones = async (req, res) => {
  try {
    const { estado, programa, prioridad, limit = 20, page = 1 } = req.query;
    
    const filtro = { activo: true };
    if (estado) filtro.estado = estado;
    if (programa) filtro.programa = programa;
    if (prioridad) filtro.prioridad = prioridad;

    const inscripciones = await Inscripcion.find(filtro)
      .populate('programa', 'nombre codigo')
      .populate('revisadoPor', 'nombre apellido')
      .populate('estudianteCreado', 'codigoEstudiante nombreCompleto')
      .sort({ fechaSolicitud: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Inscripcion.countDocuments(filtro);

    res.json({
      success: true,
      data: inscripciones,
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
      message: 'Error al obtener inscripciones',
      error: error.message
    });
  }
};

// Obtener inscripciones pendientes (admin)
const obtenerInscripcionesPendientes = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find({ 
      estado: 'pendiente',
      activo: true 
    })
      .populate('programa', 'nombre codigo')
      .sort({ fechaSolicitud: 1 }); // Más antiguas primero

    res.json({
      success: true,
      data: inscripciones,
      total: inscripciones.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener inscripciones pendientes',
      error: error.message
    });
  }
};

// Obtener una inscripción por ID (admin)
const obtenerInscripcionPorId = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findById(req.params.id)
      .populate('programa')
      .populate('revisadoPor', 'nombre apellido email')
      .populate('estudianteCreado');

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    res.json({
      success: true,
      data: inscripcion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la inscripción',
      error: error.message
    });
  }
};

// Cambiar estado de inscripción (admin)
const cambiarEstadoInscripcion = async (req, res) => {
  try {
    const { estado, observacionesAdmin, motivoRechazo } = req.body;

    const estadosValidos = ['pendiente', 'en_revision', 'aprobado', 'rechazado', 'matriculado', 'cancelado'];
    
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado no válido'
      });
    }

    const datosActualizar = {
      estado,
      revisadoPor: req.usuario.id,
      fechaRevision: new Date()
    };

    if (observacionesAdmin) {
      datosActualizar.observacionesAdmin = observacionesAdmin;
    }

    if (estado === 'rechazado' && motivoRechazo) {
      datosActualizar.motivoRechazo = motivoRechazo;
      datosActualizar.fechaRespuesta = new Date();
    }

    if (estado === 'aprobado') {
      datosActualizar.fechaRespuesta = new Date();
    }

    const inscripcion = await Inscripcion.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { new: true }
    )
      .populate('programa', 'nombre codigo')
      .populate('revisadoPor', 'nombre apellido');

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    res.json({
      success: true,
      message: `Estado actualizado a: ${estado}`,
      data: inscripcion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message
    });
  }
};

// Actualizar prioridad (admin)
const actualizarPrioridad = async (req, res) => {
  try {
    const { prioridad } = req.body;

    if (!['baja', 'media', 'alta'].includes(prioridad)) {
      return res.status(400).json({
        success: false,
        message: 'Prioridad no válida'
      });
    }

    const inscripcion = await Inscripcion.findByIdAndUpdate(
      req.params.id,
      { prioridad },
      { new: true }
    );

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Prioridad actualizada',
      data: inscripcion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar prioridad',
      error: error.message
    });
  }
};

// Convertir inscripción en estudiante (admin)
const matricularEstudiante = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findById(req.params.id)
      .populate('programa');

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    if (inscripcion.estado !== 'aprobado') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden matricular inscripciones aprobadas'
      });
    }

    if (inscripcion.estudianteCreado) {
      return res.status(400).json({
        success: false,
        message: 'Esta inscripción ya fue matriculada'
      });
    }

    // Verificar cupos del programa
    if (!inscripcion.programa.tieneCupos) {
      return res.status(400).json({
        success: false,
        message: 'No hay cupos disponibles'
      });
    }

    // Generar código de acceso
    const generarCodigoAcceso = () => {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let codigo = '';
      for (let i = 0; i < 8; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      return codigo;
    };

    const codigoAcceso = generarCodigoAcceso();

    // Crear estudiante
    const nuevoEstudiante = await Estudiante.create({
      nombre: inscripcion.nombreCompleto.split(' ')[0],
      apellido: inscripcion.nombreCompleto.split(' ').slice(1).join(' '),
      documento: inscripcion.documento,
      email: inscripcion.email,
      telefono: inscripcion.telefono,
      fechaNacimiento: inscripcion.fechaNacimiento,
      genero: inscripcion.genero,
      direccion: inscripcion.direccion,
      programa: inscripcion.programa._id,
      jornada: inscripcion.jornadaPreferida,
      contactoEmergencia: inscripcion.contactoEmergencia,
      codigoAcceso,
      creadoPor: req.usuario.id,
      fechaInicio: new Date()
    });

    // Incrementar cupos ocupados
    inscripcion.programa.inscripcion.cuposOcupados += 1;
    await inscripcion.programa.save();

    // Actualizar inscripción
    inscripcion.estado = 'matriculado';
    inscripcion.fechaMatricula = new Date();
    inscripcion.estudianteCreado = nuevoEstudiante._id;
    await inscripcion.save();

    await nuevoEstudiante.populate('programa', 'nombre codigo');

    res.json({
      success: true,
      message: 'Estudiante matriculado exitosamente',
      data: {
        estudiante: {
          id: nuevoEstudiante._id,
          nombreCompleto: nuevoEstudiante.nombreCompleto,
          codigoEstudiante: nuevoEstudiante.codigoEstudiante,
          email: nuevoEstudiante.email,
          programa: nuevoEstudiante.programa
        },
        codigoAccesoTemporal: codigoAcceso,
        mensaje: 'IMPORTANTE: Comunica este código al estudiante. No se volverá a mostrar.'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al matricular estudiante',
      error: error.message
    });
  }
};

// Buscar inscripciones (admin)
const buscarInscripciones = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'La búsqueda debe tener al menos 3 caracteres'
      });
    }

    const inscripciones = await Inscripcion.find({
      $or: [
        { nombreCompleto: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { 'documento.numero': { $regex: q, $options: 'i' } }
      ],
      activo: true
    })
      .populate('programa', 'nombre codigo')
      .limit(20);

    res.json({
      success: true,
      data: inscripciones,
      total: inscripciones.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar inscripciones',
      error: error.message
    });
  }
};

// Cancelar inscripción (admin o sistema)
const cancelarInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByIdAndUpdate(
      req.params.id,
      { 
        estado: 'cancelado',
        activo: false
      },
      { new: true }
    );

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Inscripción cancelada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cancelar inscripción',
      error: error.message
    });
  }
};

// Obtener estadísticas de inscripciones (admin)
const obtenerEstadisticas = async (req, res) => {
  try {
    const total = await Inscripcion.countDocuments({ activo: true });
    const pendientes = await Inscripcion.countDocuments({ estado: 'pendiente', activo: true });
    const enRevision = await Inscripcion.countDocuments({ estado: 'en_revision', activo: true });
    const aprobadas = await Inscripcion.countDocuments({ estado: 'aprobado', activo: true });
    const rechazadas = await Inscripcion.countDocuments({ estado: 'rechazado', activo: true });
    const matriculadas = await Inscripcion.countDocuments({ estado: 'matriculado', activo: true });

    // Inscripciones por programa
    const porPrograma = await Inscripcion.aggregate([
      { $match: { activo: true } },
      { $group: { _id: '$programa', total: { $sum: 1 } } },
      { $lookup: { from: 'programas', localField: '_id', foreignField: '_id', as: 'programa' } },
      { $unwind: '$programa' },
      { $project: { programa: '$programa.nombre', total: 1 } },
      { $sort: { total: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        porEstado: {
          pendientes,
          enRevision,
          aprobadas,
          rechazadas,
          matriculadas
        },
        porPrograma
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
  crearInscripcion,
  obtenerInscripciones,
  obtenerInscripcionesPendientes,
  obtenerInscripcionPorId,
  cambiarEstadoInscripcion,
  actualizarPrioridad,
  matricularEstudiante,
  buscarInscripciones,
  cancelarInscripcion,
  obtenerEstadisticas
};
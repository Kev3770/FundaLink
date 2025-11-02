const Programa = require('../models/programa.model');

// Obtener todos los programas activos (público)
const obtenerProgramas = async (req, res) => {
  try {
    const { modalidad, destacado, disponible, limit = 20, page = 1 } = req.query;
    
    const filtro = { activo: true };
    
    if (modalidad) filtro.modalidad = modalidad;
    if (destacado) filtro.destacado = destacado === 'true';
    if (disponible) filtro['inscripcion.disponible'] = disponible === 'true';

    const programas = await Programa.find(filtro)
      .select('-creadoPor -actualizadoPor') // No mostrar auditoría al público
      .sort({ orden: 1, nombre: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Programa.countDocuments(filtro);

    res.json({
      success: true,
      data: programas,
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
      message: 'Error al obtener programas',
      error: error.message
    });
  }
};

// Obtener un programa por ID (público)
const obtenerProgramaPorId = async (req, res) => {
  try {
    const programa = await Programa.findById(req.params.id);
    
    if (!programa || !programa.activo) {
      return res.status(404).json({
        success: false,
        message: 'Programa no encontrado'
      });
    }

    res.json({
      success: true,
      data: programa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el programa',
      error: error.message
    });
  }
};

// Obtener programa por código (público)
const obtenerProgramaPorCodigo = async (req, res) => {
  try {
    const programa = await Programa.findOne({ 
      codigo: req.params.codigo.toUpperCase(),
      activo: true 
    });
    
    if (!programa) {
      return res.status(404).json({
        success: false,
        message: 'Programa no encontrado'
      });
    }

    res.json({
      success: true,
      data: programa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el programa',
      error: error.message
    });
  }
};

// Crear programa (solo admin)
const crearPrograma = async (req, res) => {
  try {
    const datosPrograma = {
      ...req.body,
      creadoPor: req.usuario.id
    };

    const nuevoPrograma = new Programa(datosPrograma);
    await nuevoPrograma.save();

    await nuevoPrograma.populate('creadoPor', 'nombre apellido email');

    res.status(201).json({
      success: true,
      message: 'Programa creado exitosamente',
      data: nuevoPrograma
    });
  } catch (error) {
    // Error de duplicado (código o nombre)
    if (error.code === 11000) {
      const campo = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Ya existe un programa con ese ${campo}`
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al crear el programa',
      error: error.message
    });
  }
};

// Actualizar programa (solo admin)
const actualizarPrograma = async (req, res) => {
  try {
    const datosActualizar = {
      ...req.body,
      actualizadoPor: req.usuario.id
    };

    const programaActualizado = await Programa.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { new: true, runValidators: true }
    )
    .populate('creadoPor', 'nombre apellido email')
    .populate('actualizadoPor', 'nombre apellido email');

    if (!programaActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Programa no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Programa actualizado exitosamente',
      data: programaActualizado
    });
  } catch (error) {
    if (error.code === 11000) {
      const campo = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Ya existe un programa con ese ${campo}`
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al actualizar el programa',
      error: error.message
    });
  }
};

// Eliminar programa (soft delete - solo admin)
const eliminarPrograma = async (req, res) => {
  try {
    const programa = await Programa.findByIdAndUpdate(
      req.params.id,
      { 
        activo: false,
        actualizadoPor: req.usuario.id
      },
      { new: true }
    );

    if (!programa) {
      return res.status(404).json({
        success: false,
        message: 'Programa no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Programa eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el programa',
      error: error.message
    });
  }
};

// Marcar programa como destacado (solo admin)
const marcarDestacado = async (req, res) => {
  try {
    const { destacado } = req.body;

    const programa = await Programa.findByIdAndUpdate(
      req.params.id,
      { 
        destacado,
        actualizadoPor: req.usuario.id
      },
      { new: true }
    );

    if (!programa) {
      return res.status(404).json({
        success: false,
        message: 'Programa no encontrado'
      });
    }

    res.json({
      success: true,
      message: `Programa ${destacado ? 'marcado' : 'desmarcado'} como destacado`,
      data: programa
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar destacado',
      error: error.message
    });
  }
};

// Actualizar disponibilidad de inscripción (solo admin)
const actualizarDisponibilidad = async (req, res) => {
  try {
    const { disponible } = req.body;

    const programa = await Programa.findByIdAndUpdate(
      req.params.id,
      { 
        'inscripcion.disponible': disponible,
        actualizadoPor: req.usuario.id
      },
      { new: true }
    );

    if (!programa) {
      return res.status(404).json({
        success: false,
        message: 'Programa no encontrado'
      });
    }

    res.json({
      success: true,
      message: `Inscripción ${disponible ? 'habilitada' : 'deshabilitada'}`,
      data: programa
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar disponibilidad',
      error: error.message
    });
  }
};

// Obtener programas con inscripción abierta (público)
const obtenerProgramasDisponibles = async (req, res) => {
  try {
    const programas = await Programa.find({ 
      activo: true,
      'inscripcion.disponible': true
    })
    .select('-creadoPor -actualizadoPor')
    .sort({ orden: 1, nombre: 1 });

    // Filtrar solo los que tienen cupos
    const programasConCupos = programas.filter(programa => programa.tieneCupos);

    res.json({
      success: true,
      data: programasConCupos,
      total: programasConCupos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener programas disponibles',
      error: error.message
    });
  }
};

// Obtener todos los programas (solo admin - incluye inactivos)
const obtenerTodosProgramas = async (req, res) => {
  try {
    const { activo, limit = 50, page = 1 } = req.query;
    
    const filtro = {};
    if (activo !== undefined) filtro.activo = activo === 'true';

    const programas = await Programa.find(filtro)
      .populate('creadoPor', 'nombre apellido email')
      .populate('actualizadoPor', 'nombre apellido email')
      .sort({ orden: 1, nombre: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Programa.countDocuments(filtro);

    res.json({
      success: true,
      data: programas,
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
      message: 'Error al obtener programas',
      error: error.message
    });
  }
};

module.exports = {
  obtenerProgramas,
  obtenerProgramaPorId,
  obtenerProgramaPorCodigo,
  crearPrograma,
  actualizarPrograma,
  eliminarPrograma,
  marcarDestacado,
  actualizarDisponibilidad,
  obtenerProgramasDisponibles,
  obtenerTodosProgramas
};
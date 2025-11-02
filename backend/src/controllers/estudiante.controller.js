const Estudiante = require('../models/estudiante.model');
const Programa = require('../models/programa.model');
const { generarToken } = require('../utils/jwt.utils');

// Generar código de acceso aleatorio
const generarCodigoAcceso = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 8; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
};

// Registrar nuevo estudiante (admin)
const registrarEstudiante = async (req, res) => {
  try {
    const { programa, ...datosEstudiante } = req.body;

    // Verificar que el programa existe y está activo
    const programaExiste = await Programa.findById(programa);
    if (!programaExiste || !programaExiste.activo) {
      return res.status(400).json({
        success: false,
        message: 'Programa no válido o inactivo'
      });
    }

    // Verificar si hay cupos disponibles
    if (!programaExiste.tieneCupos) {
      return res.status(400).json({
        success: false,
        message: 'No hay cupos disponibles para este programa'
      });
    }

    // Generar código de acceso
    const codigoAcceso = generarCodigoAcceso();

    // Crear estudiante
    const estudiante = await Estudiante.create({
      ...datosEstudiante,
      programa,
      codigoAcceso,
      creadoPor: req.usuario.id
    });

    // Incrementar cupos ocupados del programa
    programaExiste.inscripcion.cuposOcupados += 1;
    await programaExiste.save();

    // Poblar información del programa
    await estudiante.populate('programa', 'nombre codigo');

    res.status(201).json({
      success: true,
      message: 'Estudiante registrado exitosamente',
      data: {
        estudiante: {
          id: estudiante._id,
          nombreCompleto: estudiante.nombreCompleto,
          email: estudiante.email,
          codigoEstudiante: estudiante.codigoEstudiante,
          programa: estudiante.programa
        },
        // IMPORTANTE: Solo se muestra una vez
        codigoAccesoTemporal: codigoAcceso,
        mensaje: 'IMPORTANTE: Guarda este código de acceso. No se volverá a mostrar.'
      }
    });
  } catch (error) {
    // Error de duplicado
    if (error.code === 11000) {
      const campo = Object.keys(error.keyPattern)[0];
      let mensaje = '';
      if (campo === 'email') mensaje = 'El email ya está registrado';
      else if (campo === 'documento.numero') mensaje = 'El documento ya está registrado';
      else mensaje = 'Ya existe un estudiante con esos datos';
      
      return res.status(400).json({
        success: false,
        message: mensaje
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al registrar estudiante',
      error: error.message
    });
  }
};

// Login de estudiante con código de acceso
const loginEstudiante = async (req, res) => {
  try {
    const { codigoEstudiante, codigoAcceso } = req.body;

    // Validar que vengan ambos datos
    if (!codigoEstudiante || !codigoAcceso) {
      return res.status(400).json({
        success: false,
        message: 'Por favor ingresa código de estudiante y código de acceso'
      });
    }

    // Buscar estudiante (incluyendo codigoAcceso que está oculto)
    const estudiante = await Estudiante.findOne({ 
      codigoEstudiante: codigoEstudiante.toUpperCase() 
    })
    .select('+codigoAcceso')
    .populate('programa', 'nombre codigo modalidad jornada');

    if (!estudiante) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar si el estudiante está activo
    if (!estudiante.activo || estudiante.estado !== 'activo') {
      return res.status(401).json({
        success: false,
        message: 'Estudiante inactivo. Contacta con la administración'
      });
    }

    // Verificar código de acceso
    const codigoCorrecto = await estudiante.compararCodigoAcceso(codigoAcceso);

    if (!codigoCorrecto) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Actualizar último acceso
    estudiante.ultimoAcceso = new Date();
    await estudiante.save();

    // Generar token
    const token = generarToken(estudiante._id);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        id: estudiante._id,
        nombreCompleto: estudiante.nombreCompleto,
        email: estudiante.email,
        codigoEstudiante: estudiante.codigoEstudiante,
        programa: estudiante.programa,
        estado: estudiante.estado,
        ultimoAcceso: estudiante.ultimoAcceso
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

// Obtener perfil del estudiante autenticado
const obtenerPerfilEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.estudiante.id)
      .populate('programa')
      .populate('creadoPor', 'nombre apellido');

    res.json({
      success: true,
      data: estudiante
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};

// Obtener todos los estudiantes (admin)
const obtenerEstudiantes = async (req, res) => {
  try {
    const { estado, programa, jornada, limit = 20, page = 1 } = req.query;
    
    const filtro = {};
    if (estado) filtro.estado = estado;
    if (programa) filtro.programa = programa;
    if (jornada) filtro.jornada = jornada;

    const estudiantes = await Estudiante.find(filtro)
      .populate('programa', 'nombre codigo')
      .select('-codigoAcceso') // No mostrar código de acceso
      .sort({ fechaInscripcion: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Estudiante.countDocuments(filtro);

    res.json({
      success: true,
      data: estudiantes,
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
      message: 'Error al obtener estudiantes',
      error: error.message
    });
  }
};

// Obtener un estudiante por ID (admin)
const obtenerEstudiantePorId = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id)
      .populate('programa')
      .populate('creadoPor', 'nombre apellido email')
      .populate('actualizadoPor', 'nombre apellido email');

    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.json({
      success: true,
      data: estudiante
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estudiante',
      error: error.message
    });
  }
};

// Actualizar estudiante (admin)
const actualizarEstudiante = async (req, res) => {
  try {
    const { codigoAcceso, codigoEstudiante, ...datosActualizar } = req.body;

    // No permitir actualizar códigos por esta ruta
    datosActualizar.actualizadoPor = req.usuario.id;

    const estudianteActualizado = await Estudiante.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { new: true, runValidators: true }
    )
    .populate('programa', 'nombre codigo');

    if (!estudianteActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Estudiante actualizado exitosamente',
      data: estudianteActualizado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar estudiante',
      error: error.message
    });
  }
};

// Cambiar estado del estudiante (admin)
const cambiarEstadoEstudiante = async (req, res) => {
  try {
    const { estado } = req.body;

    if (!['activo', 'inactivo', 'graduado', 'retirado', 'suspendido'].includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado no válido'
      });
    }

    const estudiante = await Estudiante.findByIdAndUpdate(
      req.params.id,
      { 
        estado,
        actualizadoPor: req.usuario.id,
        ...(estado === 'graduado' ? { fechaGraduacion: new Date() } : {})
      },
      { new: true }
    );

    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.json({
      success: true,
      message: `Estado actualizado a: ${estado}`,
      data: estudiante
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al cambiar estado',
      error: error.message
    });
  }
};

// Resetear código de acceso (admin)
const resetearCodigoAcceso = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);

    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    // Generar nuevo código
    const nuevoCodigoAcceso = generarCodigoAcceso();
    estudiante.codigoAcceso = nuevoCodigoAcceso;
    estudiante.actualizadoPor = req.usuario.id;
    await estudiante.save();

    res.json({
      success: true,
      message: 'Código de acceso reseteado exitosamente',
      data: {
        codigoEstudiante: estudiante.codigoEstudiante,
        nombreCompleto: estudiante.nombreCompleto,
        nuevoCodigoAcceso: nuevoCodigoAcceso,
        mensaje: 'IMPORTANTE: Comunica este nuevo código al estudiante. No se volverá a mostrar.'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al resetear código de acceso',
      error: error.message
    });
  }
};

// Desactivar estudiante (admin - soft delete)
const desactivarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(
      req.params.id,
      { 
        activo: false,
        estado: 'inactivo',
        actualizadoPor: req.usuario.id
      },
      { new: true }
    );

    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Estudiante desactivado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al desactivar estudiante',
      error: error.message
    });
  }
};

// Buscar estudiantes (admin)
const buscarEstudiantes = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'La búsqueda debe tener al menos 3 caracteres'
      });
    }

    const estudiantes = await Estudiante.find({
      $or: [
        { nombre: { $regex: q, $options: 'i' } },
        { apellido: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { codigoEstudiante: { $regex: q, $options: 'i' } },
        { 'documento.numero': { $regex: q, $options: 'i' } }
      ]
    })
    .populate('programa', 'nombre codigo')
    .select('-codigoAcceso')
    .limit(20);

    res.json({
      success: true,
      data: estudiantes,
      total: estudiantes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar estudiantes',
      error: error.message
    });
  }
};

module.exports = {
  registrarEstudiante,
  loginEstudiante,
  obtenerPerfilEstudiante,
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  actualizarEstudiante,
  cambiarEstadoEstudiante,
  resetearCodigoAcceso,
  desactivarEstudiante,
  buscarEstudiantes
};
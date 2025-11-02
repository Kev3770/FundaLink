const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const estudianteSchema = new mongoose.Schema({
  // Información personal
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true
  },
  documento: {
    tipo: {
      type: String,
      enum: ['CC', 'TI', 'CE', 'Pasaporte'],
      required: [true, 'El tipo de documento es obligatorio']
    },
    numero: {
      type: String,
      required: [true, 'El número de documento es obligatorio'],
      unique: true,
      trim: true
    }
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'],
    default: 'Prefiero no decir'
  },
  direccion: {
    calle: String,
    ciudad: String,
    departamento: String,
    codigoPostal: String
  },
  // Información académica
  programa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Programa',
    required: [true, 'El programa es obligatorio']
  },
  codigoEstudiante: {
    type: String,
    required: [true, 'El código de estudiante es obligatorio'],
    unique: true,
    uppercase: true,
    trim: true
  },
  codigoAcceso: {
    type: String,
    required: [true, 'El código de acceso es obligatorio'],
    unique: true,
    select: false // No se devuelve por defecto
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'graduado', 'retirado', 'suspendido'],
    default: 'activo'
  },
  jornada: {
    type: String,
    enum: ['Diurna', 'Nocturna', 'Mixta', 'Fines de semana'],
    required: [true, 'La jornada es obligatoria']
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now
  },
  fechaInicio: {
    type: Date,
    default: null
  },
  fechaGraduacion: {
    type: Date,
    default: null
  },
  // Información de contacto de emergencia
  contactoEmergencia: {
    nombre: {
      type: String,
      required: [true, 'El nombre del contacto de emergencia es obligatorio']
    },
    relacion: {
      type: String,
      required: [true, 'La relación es obligatoria']
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono del contacto de emergencia es obligatorio']
    }
  },
  // Información adicional
  foto: {
    type: String,
    default: null
  },
  observaciones: {
    type: String,
    default: null
  },
  // Control de acceso
  activo: {
    type: Boolean,
    default: true
  },
  ultimoAcceso: {
    type: Date,
    default: null
  },
  // Auditoría
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  actualizadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }
}, {
  timestamps: true
});

// Generar código de estudiante automáticamente antes de guardar
estudianteSchema.pre('save', async function(next) {
  if (this.isNew && !this.codigoEstudiante) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Estudiante').countDocuments();
    this.codigoEstudiante = `EST${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Encriptar código de acceso antes de guardar
estudianteSchema.pre('save', async function(next) {
  if (!this.isModified('codigoAcceso')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.codigoAcceso = await bcrypt.hash(this.codigoAcceso, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar código de acceso
estudianteSchema.methods.compararCodigoAcceso = async function(codigoIngresado) {
  return await bcrypt.compare(codigoIngresado, this.codigoAcceso);
};

// Virtual para nombre completo
estudianteSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

// Virtual para edad
estudianteSchema.virtual('edad').get(function() {
  if (!this.fechaNacimiento) return null;
  const hoy = new Date();
  const nacimiento = new Date(this.fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
});

// Virtual para documento completo
estudianteSchema.virtual('documentoCompleto').get(function() {
  return `${this.documento.tipo} ${this.documento.numero}`;
});

// Índices
estudianteSchema.index({ 'documento.numero': 1 });
estudianteSchema.index({ email: 1 });
estudianteSchema.index({ codigoEstudiante: 1 });
estudianteSchema.index({ nombre: 'text', apellido: 'text' });

// Incluir virtuals en JSON
estudianteSchema.set('toJSON', { virtuals: true });
estudianteSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Estudiante', estudianteSchema);
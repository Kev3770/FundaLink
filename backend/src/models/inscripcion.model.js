const mongoose = require('mongoose');

const inscripcionSchema = new mongoose.Schema({
  // Información Personal del Solicitante
  nombreCompleto: {
    type: String,
    required: [true, 'El nombre completo es obligatorio'],
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
      trim: true
    }
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
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
    ciudad: {
      type: String,
      required: [true, 'La ciudad es obligatoria']
    },
    departamento: {
      type: String,
      required: [true, 'El departamento es obligatorio']
    }
  },
  
  // Programa Solicitado
  programa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Programa',
    required: [true, 'El programa es obligatorio']
  },
  jornadaPreferida: {
    type: String,
    enum: ['Diurna', 'Nocturna', 'Mixta', 'Fines de semana'],
    required: [true, 'La jornada preferida es obligatoria']
  },
  
  // Información Adicional
  nivelEducativo: {
    type: String,
    enum: ['Bachiller', 'Técnico', 'Tecnólogo', 'Profesional', 'Otro'],
    required: [true, 'El nivel educativo es obligatorio']
  },
  trabajaActualmente: {
    type: Boolean,
    default: false
  },
  empresaActual: {
    type: String,
    trim: true
  },
  motivacion: {
    type: String,
    required: [true, 'La motivación es obligatoria'],
    minlength: [50, 'La motivación debe tener mínimo 50 caracteres'],
    maxlength: [500, 'La motivación no puede exceder 500 caracteres']
  },
  comoSeEntero: {
    type: String,
    enum: ['Redes Sociales', 'Recomendación', 'Internet', 'Publicidad', 'Otro'],
    required: [true, 'Este campo es obligatorio']
  },
  
  // Contacto de Emergencia
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
  
  // Estado de la Solicitud
  estado: {
    type: String,
    enum: ['pendiente', 'en_revision', 'aprobado', 'rechazado', 'matriculado', 'cancelado'],
    default: 'pendiente'
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media'
  },
  
  // Fechas Importantes
  fechaSolicitud: {
    type: Date,
    default: Date.now
  },
  fechaRevision: {
    type: Date,
    default: null
  },
  fechaRespuesta: {
    type: Date,
    default: null
  },
  fechaMatricula: {
    type: Date,
    default: null
  },
  
  // Gestión Administrativa
  observacionesAdmin: {
    type: String,
    default: null
  },
  motivoRechazo: {
    type: String,
    default: null
  },
  revisadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  estudianteCreado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante',
    default: null
  },
  
  // Control
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual para calcular edad
inscripcionSchema.virtual('edad').get(function() {
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
inscripcionSchema.virtual('documentoCompleto').get(function() {
  return `${this.documento.tipo} ${this.documento.numero}`;
});

// Índices
inscripcionSchema.index({ 'documento.numero': 1 });
inscripcionSchema.index({ email: 1 });
inscripcionSchema.index({ estado: 1 });
inscripcionSchema.index({ nombreCompleto: 'text' });

// Incluir virtuals en JSON
inscripcionSchema.set('toJSON', { virtuals: true });
inscripcionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Inscripcion', inscripcionSchema);
const mongoose = require('mongoose');

const programaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del programa es obligatorio'],
    trim: true,
    unique: true,
    maxlength: [200, 'El nombre no puede exceder 200 caracteres']
  },
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [20, 'El código no puede exceder 20 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    minlength: [100, 'La descripción debe tener mínimo 100 caracteres']
  },
  duracion: {
    valor: {
      type: Number,
      required: [true, 'La duración es obligatoria']
    },
    unidad: {
      type: String,
      enum: ['meses', 'años', 'semestres'],
      default: 'meses'
    }
  },
  modalidad: {
    type: String,
    enum: ['Presencial', 'Virtual', 'Semipresencial'],
    required: [true, 'La modalidad es obligatoria'],
    default: 'Presencial'
  },
  jornada: {
    type: String,
    enum: ['Diurna', 'Nocturna', 'Mixta', 'Fines de semana'],
    default: 'Diurna'
  },
  requisitos: {
    type: [String],
    required: [true, 'Los requisitos son obligatorios'],
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'Debe haber al menos un requisito'
    }
  },
  objetivos: {
    type: String,
    required: [true, 'Los objetivos son obligatorios']
  },
  perfilEgresado: {
    type: String,
    required: [true, 'El perfil del egresado es obligatorio']
  },
  competencias: {
    type: [String],
    default: []
  },
  campoLaboral: {
    type: String,
    default: null
  },
  materias: {
    type: [String],
    default: []
  },
  imagen: {
    type: String,
    default: null
  },
  // Información de costos
  costos: {
    matricula: {
      type: Number,
      required: [true, 'El costo de matrícula es obligatorio'],
      min: [0, 'El costo no puede ser negativo']
    },
    mensualidad: {
      type: Number,
      required: [true, 'El costo de mensualidad es obligatorio'],
      min: [0, 'El costo no puede ser negativo']
    },
    totalPrograma: {
      type: Number,
      default: 0
    },
    moneda: {
      type: String,
      default: 'COP'
    }
  },
  // Información de inscripción
  inscripcion: {
    disponible: {
      type: Boolean,
      default: true
    },
    cuposDisponibles: {
      type: Number,
      default: null // null = ilimitado
    },
    cuposOcupados: {
      type: Number,
      default: 0
    },
    fechaInicio: {
      type: Date,
      default: null
    },
    fechaCierre: {
      type: Date,
      default: null
    }
  },
  // Estado y visibilidad
  activo: {
    type: Boolean,
    default: true
  },
  destacado: {
    type: Boolean,
    default: false
  },
  orden: {
    type: Number,
    default: 0 // Para ordenar en la página
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

// Virtual para verificar si hay cupos disponibles
programaSchema.virtual('tieneCupos').get(function() {
  if (!this.inscripcion.cuposDisponibles) return true; // ilimitado
  return this.inscripcion.cuposOcupados < this.inscripcion.cuposDisponibles;
});

// Virtual para calcular cupos restantes
programaSchema.virtual('cuposRestantes').get(function() {
  if (!this.inscripcion.cuposDisponibles) return null; // ilimitado
  return this.inscripcion.cuposDisponibles - this.inscripcion.cuposOcupados;
});

// Virtual para texto de duración
programaSchema.virtual('duracionTexto').get(function() {
  return `${this.duracion.valor} ${this.duracion.unidad}`;
});

// Middleware para calcular costo total
programaSchema.pre('save', function(next) {
  if (this.duracion.unidad === 'meses') {
    this.costos.totalPrograma = this.costos.matricula + (this.costos.mensualidad * this.duracion.valor);
  } else if (this.duracion.unidad === 'semestres') {
    // Asumiendo 6 meses por semestre
    const meses = this.duracion.valor * 6;
    this.costos.totalPrograma = this.costos.matricula + (this.costos.mensualidad * meses);
  } else if (this.duracion.unidad === 'años') {
    // Asumiendo 12 meses por año
    const meses = this.duracion.valor * 12;
    this.costos.totalPrograma = this.costos.matricula + (this.costos.mensualidad * meses);
  }
  next();
});

// Índices para búsquedas
programaSchema.index({ nombre: 'text', descripcion: 'text' });
programaSchema.index({ codigo: 1 });

// Incluir virtuals en JSON
programaSchema.set('toJSON', { virtuals: true });
programaSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Programa', programaSchema);
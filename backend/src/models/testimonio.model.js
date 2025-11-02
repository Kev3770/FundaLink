const mongoose = require('mongoose');

const testimonioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [100, 'El apellido no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  foto: {
    type: String,
    default: null // URL de la foto
  },
  testimonio: {
    type: String,
    required: [true, 'El testimonio es obligatorio'],
    minlength: [50, 'El testimonio debe tener mínimo 50 caracteres'],
    maxlength: [1000, 'El testimonio no puede exceder 1000 caracteres']
  },
  programa: {
    type: String,
    required: [true, 'El programa es obligatorio'],
    trim: true
  },
  promocion: {
    type: String,
    required: [true, 'La promoción es obligatoria'],
    trim: true
  },
  ocupacionActual: {
    type: String,
    trim: true,
    default: null
  },
  empresaActual: {
    type: String,
    trim: true,
    default: null
  },
  calificacion: {
    type: Number,
    min: [1, 'La calificación mínima es 1'],
    max: [5, 'La calificación máxima es 5'],
    default: 5
  },
  destacado: {
    type: Boolean,
    default: false
  },
  aprobado: {
    type: Boolean,
    default: false // Requiere aprobación del admin
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaPublicacion: {
    type: Date,
    default: null // Se asigna cuando se aprueba
  },
  // Auditoría
  aprobadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  fechaAprobacion: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Virtual para nombre completo
testimonioSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

// Índice para búsquedas
testimonioSchema.index({ nombre: 'text', apellido: 'text', testimonio: 'text' });

// Incluir virtuals en JSON
testimonioSchema.set('toJSON', { virtuals: true });
testimonioSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Testimonio', testimonioSchema);
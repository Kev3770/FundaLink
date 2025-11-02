const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  pregunta: {
    type: String,
    required: [true, 'La pregunta es obligatoria'],
    trim: true,
    maxlength: [300, 'La pregunta no puede exceder 300 caracteres']
  },
  respuesta: {
    type: String,
    required: [true, 'La respuesta es obligatoria'],
    trim: true,
    maxlength: [2000, 'La respuesta no puede exceder 2000 caracteres']
  },
  categoria: {
    type: String,
    enum: ['Inscripción', 'Programas', 'Pagos', 'General', 'Servicios', 'Requisitos', 'Horarios'],
    required: [true, 'La categoría es obligatoria'],
    default: 'General'
  },
  orden: {
    type: Number,
    default: 0
  },
  activo: {
    type: Boolean,
    default: true
  },
  vistas: {
    type: Number,
    default: 0
  },
  util: {
    type: Number,
    default: 0
  },
  noUtil: {
    type: Number,
    default: 0
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

// Índices
faqSchema.index({ categoria: 1, orden: 1 });
faqSchema.index({ pregunta: 'text', respuesta: 'text' });

module.exports = mongoose.model('FAQ', faqSchema);
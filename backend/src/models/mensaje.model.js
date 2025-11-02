const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  // Información del Remitente
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
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
    trim: true,
    default: null
  },
  
  // Contenido del Mensaje
  asunto: {
    type: String,
    required: [true, 'El asunto es obligatorio'],
    trim: true,
    maxlength: [200, 'El asunto no puede exceder 200 caracteres']
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es obligatorio'],
    minlength: [10, 'El mensaje debe tener mínimo 10 caracteres'],
    maxlength: [2000, 'El mensaje no puede exceder 2000 caracteres']
  },
  tipo: {
    type: String,
    enum: ['consulta', 'sugerencia', 'queja', 'felicitacion', 'otro'],
    default: 'consulta'
  },
  
  // Gestión del Mensaje
  leido: {
    type: Boolean,
    default: false
  },
  respondido: {
    type: Boolean,
    default: false
  },
  importante: {
    type: Boolean,
    default: false
  },
  archivado: {
    type: Boolean,
    default: false
  },
  
  // Respuesta
  respuesta: {
    type: String,
    default: null
  },
  respondidoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  fechaRespuesta: {
    type: Date,
    default: null
  },
  
  // Notas Internas (solo visibles para admin)
  notasInternas: {
    type: String,
    default: null
  },
  
  // Información Adicional
  ip: {
    type: String,
    default: null
  },
  navegador: {
    type: String,
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

// Índices
mensajeSchema.index({ email: 1 });
mensajeSchema.index({ leido: 1 });
mensajeSchema.index({ respondido: 1 });
mensajeSchema.index({ tipo: 1 });
mensajeSchema.index({ nombre: 'text', asunto: 'text', mensaje: 'text' });

module.exports = mongoose.model('Mensaje', mensajeSchema);
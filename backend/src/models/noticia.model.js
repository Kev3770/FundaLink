const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio']
  },
  imagen: {
    type: String,
    default: null
  },
  autor: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    default: 'Administrador FUNDAESTÉCNICOS'
  },
  categoria: {
    type: String,
    enum: ['Académica', 'Administrativa', 'Evento', 'General'],
    default: 'General'
  },
  destacada: {
    type: Boolean,
    default: false
  },
  activa: {
    type: Boolean,
    default: true
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  },
  // NUEVOS CAMPOS
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

noticiaSchema.index({ titulo: 'text', contenido: 'text' });

module.exports = mongoose.model('Noticia', noticiaSchema);
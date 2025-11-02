const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del evento es obligatorio'],
    trim: true,
    maxlength: [200, 'El nombre no puede exceder 200 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha del evento es obligatoria']
  },
  horaInicio: {
    type: String,
    required: [true, 'La hora de inicio es obligatoria']
  },
  horaFin: {
    type: String
  },
  lugar: {
    type: String,
    required: [true, 'El lugar es obligatorio']
  },
  imagen: {
    type: String,
    default: null
  },
  tipo: {
    type: String,
    enum: ['Académico', 'Cultural', 'Deportivo', 'Institucional', 'Social'],
    default: 'Institucional'
  },
  capacidadMaxima: {
    type: Number,
    default: null
  },
  inscritosCount: {
    type: Number,
    default: 0
  },
  requiereInscripcion: {
    type: Boolean,
    default: false
  },
  destacado: {
    type: Boolean,
    default: false
  },
  activo: {
    type: Boolean,
    default: true
  },
  organizador: {
    type: String,
    default: 'FUNDAESTÉCNICOS'
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

eventoSchema.virtual('esPasado').get(function() {
  return this.fecha < new Date();
});

eventoSchema.virtual('estaLleno').get(function() {
  if (!this.capacidadMaxima) return false;
  return this.inscritosCount >= this.capacidadMaxima;
});

eventoSchema.set('toJSON', { virtuals: true });
eventoSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Evento', eventoSchema);
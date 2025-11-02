const mongoose = require('mongoose');

const informacionSchema = new mongoose.Schema({
  // Información Básica
  mision: {
    type: String,
    required: [true, 'La misión es obligatoria'],
    trim: true
  },
  vision: {
    type: String,
    required: [true, 'La visión es obligatoria'],
    trim: true
  },
  historia: {
    type: String,
    required: [true, 'La historia es obligatoria'],
    trim: true
  },
  valores: {
    type: [String],
    default: []
  },
  objetivos: {
    type: String,
    trim: true
  },
  
  // Rectoría
  rectoria: {
    nombre: {
      type: String,
      default: null
    },
    cargo: {
      type: String,
      default: 'Rector(a)'
    },
    mensaje: {
      type: String,
      default: null
    },
    foto: {
      type: String,
      default: null
    }
  },
  
  // Información de Contacto
  contacto: {
    direccion: {
      type: String,
      required: [true, 'La dirección es obligatoria']
    },
    ciudad: {
      type: String,
      default: 'Cali'
    },
    departamento: {
      type: String,
      default: 'Valle del Cauca'
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio']
    },
    celular: {
      type: String,
      default: null
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      lowercase: true
    },
    horarioAtencion: {
      type: String,
      default: 'Lunes a Viernes: 8:00 AM - 5:00 PM'
    }
  },
  
  // Redes Sociales
  redesSociales: {
    facebook: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    },
    whatsapp: {
      type: String,
      default: null
    },
    youtube: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    },
    tiktok: {
      type: String,
      default: null
    }
  },
  
  // Logotipos e Imágenes
  imagenes: {
    logo: {
      type: String,
      default: null
    },
    logoDark: {
      type: String,
      default: null
    },
    banner: {
      type: String,
      default: null
    },
    instalaciones: {
      type: [String],
      default: []
    }
  },
  
  // Información Legal
  legal: {
    nit: {
      type: String,
      default: null
    },
    razonSocial: {
      type: String,
      default: null
    },
    representanteLegal: {
      type: String,
      default: null
    }
  },
  
  // Acreditaciones y Reconocimientos
  acreditaciones: {
    type: [String],
    default: []
  },
  
  // SEO
  seo: {
    metaTitle: {
      type: String,
      default: 'FUNDAESTÉCNICOS - Institución Educativa'
    },
    metaDescription: {
      type: String,
      default: 'Institución educativa técnica de excelencia'
    },
    keywords: {
      type: [String],
      default: []
    }
  },
  
  // Auditoría
  actualizadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Informacion', informacionSchema);
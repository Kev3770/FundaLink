const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mensaje de bienvenida en la raíz
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 FUNDALink API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      test: '/api/test',
      usuarios: '/api/usuarios',
      estudiantes: '/api/estudiantes',
      noticias: '/api/noticias',
      eventos: '/api/eventos',
      testimonios: '/api/testimonios',
      programas: '/api/programas',
      inscripciones: '/api/inscripciones',
      mensajes: '/api/mensajes',
      faqs: '/api/faqs',
      informacion: '/api/informacion'
    }
  });
});

// Importar rutas
const testRoutes = require('./routes/test.routes');
const noticiaRoutes = require('./routes/noticia.routes');
const eventoRoutes = require('./routes/evento.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const testimonioRoutes = require('./routes/testimonio.routes');
const programaRoutes = require('./routes/programa.routes');
const estudianteRoutes = require('./routes/estudiante.routes');
const inscripcionRoutes = require('./routes/inscripcion.routes');
const mensajeRoutes = require('./routes/mensaje.routes');
const faqRoutes = require('./routes/faq.routes');
const informacionRoutes = require('./routes/informacion.routes');

// Usar rutas
app.use('/api/test', testRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/testimonios', testimonioRoutes);
app.use('/api/programas', programaRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/informacion', informacionRoutes);

module.exports = app;
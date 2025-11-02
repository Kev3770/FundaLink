require('dotenv').config(); // Carga las variables del .env
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 4000;

// Conectar a MongoDB
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 Ambiente: ${process.env.NODE_ENV}`);
});
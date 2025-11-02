# 🚀 FUNDALink - Sistema de Información Institucional

Sistema de información web y móvil para la Institución Educativa FUNDAESTÉCNICOS.

## 📋 Descripción

FUNDALink es una plataforma integral que permite:
- Gestión de noticias y eventos institucionales
- Sistema de inscripciones en línea
- Portal de estudiantes con código de acceso
- Gestión de programas educativos
- Sistema de testimonios
- FAQ y mensajería

## 🛠️ Stack Tecnológico

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

### Frontend
- Angular 17+
- TypeScript
- Bootstrap / Tailwind CSS

## 📁 Estructura del Proyecto
```
FUNDALink/
├── backend/          # API REST (Node.js + Express)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   └── package.json
│
└── frontend/         # SPA (Angular)
    ├── src/
    │   └── app/
    └── package.json
```

## 🚀 Instalación

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configurar variables de entorno
npm run dev
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

## 🌐 URLs

- **Backend API:** http://localhost:4000
- **Frontend:** http://localhost:4200

## 📚 Documentación API

Ver documentación completa en `/backend/docs/API.md`

## 👨‍💻 Autor

**Kevin Alejandro Peña Ramírez**

## 📄 Licencia

Este proyecto es privado y pertenece a FUNDAESTÉCNICOS.
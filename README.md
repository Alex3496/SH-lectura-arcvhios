# SH-lectura-arcvhios

## Descripción

Este proyecto es una **prueba técnica Full-Stack** cuyo propósito es construir una aplicación web para cargar, visualizar y buscar datos en archivos CSV, usando una arquitectura moderna con React y Node.js.

## Objetivo principal

- **Facilitar la carga y exploración de archivos CSV**.
- **Permitir búsqueda interactiva** de los datos cargados.
- **Demostrar habilidades en desarrollo Full-Stack** (TypeScript, React, Node.js, pruebas automatizadas y diseño responsivo).

---

## Características principales

### Frontend (React SPA)
- Corre en el **puerto 4000**.
- Permite **seleccionar y cargar archivos CSV**.
- Incluye **barra de búsqueda** para filtrar datos.
- Muestra datos en **tarjetas**.
- **Diseño responsivo** y manejo de errores amigable.

### Backend (Node.js REST API)
- Corre en el **puerto 3000**.
- **API RESTful** sin frameworks opinados.
- Principales endpoints:
  - `POST /api/files`: Carga y almacena el CSV.
  - `GET /api/users`: Busca en los datos cargados.

---

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/Alex3496/SH-lectura-arcvhios.git
   cd SH-lectura-arcvhios
   ```

2. **Instala dependencias:**

   - Para el backend y frontend se instalan juntas:
     ```sh
     npm install
     ```
---

## Uso

### Backend y Frontend

1. Ejecuta el comando:
   ```sh
   npm run dev
   ```
   El backend estará disponible en [http://localhost:3000](http://localhost:3000).
   El frontend estará disponible en [http://localhost:4000](http://localhost:4000).

---

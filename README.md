# Football Manager Client - Frontend SPA

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

Interfaz de usuario moderna y dinámica para la gestión de equipos de fútbol. Esta aplicación consume una API RESTful propia y ofrece una experiencia de usuario fluida (Single Page Application).

🌍 **Live Demo:** [Ver Aplicación en Vivo](https://manager-futbol.netlify.app)
> **Nota importante sobre la demo:** El backend está desplegado en la capa gratuita de Render. Si la API no ha recibido peticiones recientemente, el primer tiempo de carga puede demorar entre **30 y 60 segundos** mientras el servidor "despierta". Las peticiones siguientes responderán con normalidad.

---

## Funcionalidades

- **Dashboard de Equipos:** Visualización de todos los equipos con paginación optimizada desde el servidor.
- **Búsqueda en Tiempo Real:** Filtros inteligentes para encontrar equipos por nombre.
- **Gestión de Usuario:** Registro, Inicio de Sesión y persistencia de sesión mediante JWT.
- **Panel de Control:**
  - **Usuarios:** Creación y edición de equipos propios con subida de imágenes.
  - **Administradores:** Gestión global (eliminación y edición de cualquier equipo).
- **Diseño Responsive:** Adaptado para una navegación cómoda en dispositivos móviles y escritorio.

## Stack Tecnológico

* **Core:** React 18+ + Vite.
* **Enrutamiento:** React Router DOM para la navegación entre secciones.
* **Comunicación:** Fetch API / Axios para el consumo de la API RESTful.
* **Estilos:** CSS3 / Bootstrap.
* **Despliegue:** Hosting automatizado en Netlify.

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Vulgurr/football-manager-frontend.git
   ```
2.  Instalar dependencias:
    ```bash
    cd football-manager-frontend
    npm install
    ```
3. Configurar variables de entorno:
   
    Crea un archivo (`.env`) en la raíz con la URL de tu API:
    ```
    VITE_API_URL=https://frontend-practica.onrender.com
    ```
5. Iniciar en modo desarrollador:
   ```bash
   npm run dev
   ```
## Proyecto completo
Este proyecto es solamente la parte del cliente. Para ver la arquitectura del servidor, puedes ir a ver la arquitectura del servidor, los modelos de bases de datos y los test suites ingresando al [siguiente enlace](https://github.com/Vulgurr/football-manager-api)

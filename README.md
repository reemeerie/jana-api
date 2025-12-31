# Just Another Notes App API

API REST desarrollada con Node.js y Express para la gestión de usuarios y notas, implementando autenticación basada en JSON Web Tokens (JWT), control de permisos y persistencia de datos en MySQL.

Este proyecto está enfocado en aplicar buenas prácticas de arquitectura backend, separando responsabilidades entre controllers, services, drivers (repositories) y middlewares, con manejo centralizado de errores y validaciones.

## Características principales

* Autenticación y autorización mediante JWT
* Roles de usuario (usuario / administrador)
* CRUD de usuarios (con permisos de administrador, salvo sign-up)
* CRUD de notas con validación de ownership
* Hash seguro de contraseñas con bcrypt
* Manejo centralizado de errores con clases personalizadas
* Validaciones y normalización de datos de entrada

## Tecnologías y dependencias

* Node.js
* Express
* MySQL (Base de datos alojada en clever-cloud)
* mysql2 (Driver MySQL con soporte para Promises y pooling)
* jsonwebtoken
* bcrypt
* dotenv
* cors

## Arquitectura

El proyecto sigue una estructura modular orientada a responsabilidades claras:
* Controllers: manejo de requests y responses HTTP
* Services: lógica de negocio
* Drivers: acceso a la base de datos
* Middlewares: autenticación, autorización y validaciones
* Errors: clases de errores personalizadas con status HTTP
Este enfoque permite mantener el código desacoplado, testeable y fácil de escalar.

## Autenticación y permisos

* Los usuarios se autentican mediante JWT
* El token incluye información básica del usuario (id, rol)
* Las operaciones sensibles validan:
  * autenticación (token válido)
  * autorización (rol)
  * ownership (el recurso pertenece al usuario)

## Variables de entorno

Crear un archivo .env en la raíz del proyecto con las siguientes variables:
* HOST=localhost
* USER=db_user
* PASSWORD=db_password
* DATABASE=db_name
* DB_PORT=3306
* SECRET=your_secret_key

## Instalación y ejecución

```
npm install
npm run dev
```

El servidor quedará disponible en: http://localhost:1410

*Este proyecto tiene como objetivo servir como base sólida para APIs REST en Node.js, priorizando claridad, seguridad y buenas prácticas por sobre soluciones mágicas o frameworks pesados.*
# 🧠 Task Manager API

API RESTful desarrollada en **Node.js**, **TypeScript** y **Prisma ORM**, bajo una **arquitectura en capas (Controller - Service - Repository - Data Source)** para la gestión de tareas.  
El sistema permite crear, listar, actualizar y eliminar tareas, así como autenticar usuarios con JWT.

---

## 🚀 Tecnologías Utilizadas

- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **Postgres**
- **JWT (JSON Web Token)** para autenticación
- **bcryptjs** para encriptación de contraseñas
- **Zod / class-validator** (opcional) para validación de datos

---

## 🧩 Arquitectura del Proyecto: Arquitectura en capas

- **DATA ACCESS (DA):**  
  Define las **interfaces de repositorio** que especifican las operaciones que deben implementarse para interactuar con las entidades.
  Aquí se usa **Prisma ORM** para el acceso a la base de datos (consultas, inserciones, actualizaciones, etc.).
  Ejemplo: `TaskRepository`, `UserRepository`.

- **BUSINESS LOGIC (BL):**  
  Encapsula la **lógica de negocio**.  
  Valida datos, aplica reglas de dominio y coordina las operaciones entre las entidades y repositorios.  
  Ejemplo: `TaskService`, `AuthService`.

- **SERVICES (API Layer):**  
  Expone los **endpoints REST** de la aplicación.  
  Contiene los **controladores** que manejan las solicitudes HTTP y utilizan la capa BL para procesar la lógica.  
  Ejemplo: `TaskController`, `AuthController`.

- **UTIL (Infraestructura y Utilidades):**  
  Contiene **utilidades y respuestas personalizadas**, como `CustomError`, `CustomResponse`, validadores y helpers globales.

---

## ⚙️ Configuración del Entorno

### Instalar dependencias

`npm install `

### Vincular la base de datos

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma generate
```

### Ejecutar el servidor

```bash
npm run dev
```

---

## ⚙️ El servidor quedará corriendo en:

http://localhost:3000

## ⚙️ Endpoints Principales:

| Método | Endpoint         | Descripción                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | Registro de usuario            |
| POST   | `/auth/login`    | Inicio de sesión con JWT       |
| GET    | `/tasks`         | Obtener todas las tareas       |
| GET    | `/tasks/:id`     | Obtener tarea por ID           |
| POST   | `/tasks`         | Crear nueva tarea              |
| PUT    | `/tasks/:id`     | Actualizar una tarea existente |
| DELETE | `/tasks/:id`     | Eliminar una tarea             |
| GET    | `/category`      | Obtener categorías             |
| GET    | `/priority`      | Obtener prioridades            |
| GET    | `/status`        | Obtener estados                |

## 🧩 Seguridad

- Todas las contraseñas se almacenan encriptadas con bcryptjs.
- Los endpoints protegidos utilizan JWT para autenticación.
- Middleware de validación y manejo de errores unificado.

MIT © 2025 – Task Manager API

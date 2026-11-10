# Reto final: Todo App con login

Este es el último reto de **Jóvenes creaTIvos 2026**. Reciben una app de tareas que ya tiene registro e inicio de sesión con JWT.
Su misión es darle vida: crear, ver, completar y borrar tareas, y que cada persona vea solo las suyas.
Es una app full stack real: React, Express y MongoDB. ¡A construir!

## Requisitos

- **Node.js 20.6 o superior.** Revisa tu versión con `node -v`.
- **MongoDB local corriendo.** Si abres MongoDB Compass, debe conectar a `mongodb://127.0.0.1:27017`.

## Instalación

Hazlo una sola vez.

1. Instala las dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

2. Instala las dependencias del frontend. Como sigues dentro de `backend`, primero subes un nivel con `..`:

   ```bash
   cd ../frontend
   npm install
   ```

3. Copia `backend/.env.example` a `backend/.env`, y `frontend/.env.example` a `frontend/.env`. Desde la carpeta principal del proyecto:

   ```bash
   # Git Bash, macOS o Linux
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   ```powershell
   # PowerShell o CMD en Windows
   copy backend\.env.example backend\.env
   copy frontend\.env.example frontend\.env
   ```

4. Genera un secreto para los tokens:

   ```bash
   node -e "console.log(crypto.randomUUID())"
   ```

   Copia el resultado y pégalo en `backend/.env` como valor de `JWT_SECRET`. El `.env` nunca se sube a Git.

## Cómo correr el proyecto

Necesitas **dos terminales** abiertas al mismo tiempo, las dos desde la carpeta principal del proyecto.

Terminal 1, el backend:

```bash
cd backend && npm run dev
```

Terminal 2, el frontend:

```bash
cd frontend && npm run dev
```

Abre http://localhost:5173. Ya puedes crear una cuenta, iniciar sesión y cerrar sesión. Verás "No tienes tareas todavía": desde ahí empieza el reto.

## Endpoints de la API

| Método | Ruta | Protegida | Cuerpo | Respuesta OK |
| --- | --- | --- | --- | --- |
| POST | `/api/auth/registro` | No | `{ nombre, email, password }` | 201 `{ mensaje }` |
| POST | `/api/auth/login` | No | `{ email, password }` | 200 `{ token, usuario: { id, nombre, email } }` |
| GET | `/api/tareas` | Sí | — | 200 `[tareas]`, de la más nueva a la más vieja |
| POST | `/api/tareas` | Sí | `{ titulo }` | 201 `tarea` |
| PATCH | `/api/tareas/:id` | Sí | `{ completada }` y/o `{ titulo }` | 200 `tarea` actualizada |
| DELETE | `/api/tareas/:id` | Sí | — | 200 `{ mensaje, id }` |

"Protegida" significa que la petición debe llevar el header `Authorization: Bearer <token>`. Sin token, el backend responde 401 `"Token requerido"`.

Antes de empezar, lean los dos ejemplos modelo que ya funcionan:

- La ruta `GET /api/tareas` en `backend/src/routes/tareas.routes.js`.
- La función `obtenerTareas()` en `frontend/src/api.js`.

## Los tres niveles

Busquen los comentarios `// TODO (Mínimo)`, `// TODO (Medio)` y `// TODO (Reto)`. Cada uno dice qué falta y qué debe pasar cuando funcione.

### Nivel Mínimo: ver y crear tareas

**Objetivo:** escribir una tarea, presionar "Agregar" y verla en la lista.

Archivos con TODO:

- `backend/src/routes/tareas.routes.js` (ruta POST)
- `frontend/src/api.js` (`crearTarea`)
- `frontend/src/components/TodoList.jsx`
- `frontend/src/components/NuevaTarea.jsx`

**Listo si:** la tarea aparece sin recargar y sigue ahí al recargar la página.

### Nivel Medio: completar y borrar tareas

**Objetivo:** marcar tareas como hechas y eliminarlas.

Archivos con TODO:

- `backend/src/routes/tareas.routes.js` (rutas PATCH y DELETE)
- `frontend/src/api.js` (`actualizarTarea` y `eliminarTarea`)
- `frontend/src/components/TareaItem.jsx`
- `frontend/src/components/TodoList.jsx`

**Listo si:** el checkbox tacha la tarea, el botón la quita, y los dos cambios se mantienen al recargar.

### Nivel Reto: cada quien sus tareas

**Objetivo:** que cada usuario vea y modifique solo sus propias tareas.

Archivos con TODO:

- `backend/src/routes/tareas.routes.js` (un `TODO (Reto)` en cada ruta)

**Listo si:** con dos cuentas en dos navegadores (uno en incógnito), cada una ve solo sus tareas.

## Extras (opcionales)

Si terminan los tres niveles, busquen el comentario `// EXTRA` en `frontend/src/components/TodoList.jsx`:

- Filtros "Todas", "Pendientes" y "Hechas".
- Un contador de tareas pendientes.

Los estilos de los extras ya están listos en `frontend/src/index.css`.

## Si algo no funciona

| Ves esto | Qué significa | Qué hacer |
| --- | --- | --- |
| `Falta implementar ...` | Esa función o ruta todavía es un TODO | ¡Es normal! Es justo lo que les toca construir |
| `Token inválido o vencido` | El token dura 2 horas y ya venció (o lo modificaron) | Clic en "Cerrar sesión" y vuelvan a entrar |
| `No se pudo conectar con el servidor` | El backend está apagado | Revisen la terminal 1: debe decir "Servidor escuchando" |
| `No se pudo conectar a MongoDB` | MongoDB no está corriendo en su computador | Inicien el servicio de MongoDB y prueben conectar con Compass |
| `Faltan variables en backend/.env` | No existe `backend/.env` o le falta algo | Repitan los pasos 3 y 4 de la instalación |
| Dos peticiones GET iguales en `F12 → Network` | En desarrollo, React ejecuta los efectos dos veces a propósito (`StrictMode`) | Es normal, no es un error |

Antes de pedir ayuda: lean el error completo, abran `F12 → Network` y miren qué petición falló y qué respondió el backend.

## Recuerden

- Trabajen **en parejas**.
- Roten **piloto y copiloto cada 15 minutos**: el piloto escribe y el copiloto revisa, pregunta y busca.
- Usen **OpenCode solo como tutor**: pídanle que les explique, no que les escriba el código.

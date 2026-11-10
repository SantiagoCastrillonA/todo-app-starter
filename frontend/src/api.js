// La URL del backend sale de frontend/.env (VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL

// Headers para las rutas protegidas: el token viaja en Authorization
function authHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

// Lee el JSON de la respuesta. Si el backend respondió con error, lanza un Error con su mensaje.
async function leerRespuesta(res) {
  const datos = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(datos?.error || 'No se pudo conectar con el servidor')
  }

  return datos
}

export async function registrar(nombre, email, password) {
  const res = await fetch(`${API_URL}/api/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  })
  return leerRespuesta(res)
}

export async function iniciarSesion(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return leerRespuesta(res)
}

// Ejemplo modelo: pide al backend las tareas. Léelo línea por línea.
export async function obtenerTareas() {
  // fetch hace la petición HTTP y await espera la respuesta.
  // Sin "method", fetch usa GET. La URL queda http://localhost:3000/api/tareas
  const res = await fetch(`${API_URL}/api/tareas`, {
    // authHeaders() agrega el token. Sin él, el backend responde 401 "Token requerido".
    headers: authHeaders()
  })

  // leerRespuesta convierte la respuesta a JSON.
  // Si el backend respondió con error (400, 401, 404, 500…), lanza un Error con el mensaje del backend.
  return leerRespuesta(res)
}

// TODO (Mínimo): enviar un título al backend para crear una tarea (POST /api/tareas, ruta protegida).
//   Cuando funcione: devuelve la tarea creada que respondió el backend, o lanza un Error con su mensaje.
export async function crearTarea(/* titulo */) {
  throw new Error('Falta implementar crearTarea en api.js')
}

// TODO (Medio): enviar cambios de una tarea al backend (PATCH /api/tareas/:id, ruta protegida).
//   cambios es un objeto como { completada: true } o { titulo: 'Nuevo título' }.
//   Cuando funcione: devuelve la tarea actualizada, o lanza un Error con el mensaje del backend.
export async function actualizarTarea(/* id, cambios */) {
  throw new Error('Falta implementar actualizarTarea en api.js')
}

// TODO (Medio): pedir al backend que borre una tarea (DELETE /api/tareas/:id, ruta protegida).
//   Cuando funcione: devuelve { mensaje, id }, o lanza un Error con el mensaje del backend.
export async function eliminarTarea(/* id */) {
  throw new Error('Falta implementar eliminarTarea en api.js')
}

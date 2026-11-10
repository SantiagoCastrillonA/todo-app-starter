import { Router } from 'express'
import Tarea from '../models/Tarea.js'
import auth from '../middleware/auth.js'

const router = Router()

// Todas las rutas de este archivo exigen un token válido.
// Si el token está bien, auth deja en req.usuario los datos de quien hizo la petición.
router.use(auth)

// GET /api/tareas
// Ejemplo modelo: léelo línea por línea antes de empezar con las otras rutas.
// Como este router está montado en /api/tareas (mira app.js), '/' aquí es GET /api/tareas.
router.get('/', async (req, res) => {
  // TODO (Reto): esta ruta devuelve las tareas de TODOS los usuarios.
  //   Cuando funcione, cada usuario debe recibir solo sus propias tareas (filtrando por req.usuario.id).

  // Tarea.find({}) busca todas las tareas de la colección.
  // .sort({ createdAt: -1 }) las ordena de la más nueva a la más vieja.
  // await espera la respuesta de MongoDB antes de seguir.
  const tareas = await Tarea.find({}).sort({ createdAt: -1 })

  // res.json envía el arreglo al frontend. Si no ponemos status, el código es 200.
  res.json(tareas)

  // Si MongoDB falla, Express 5 manda el error al middleware de errores de app.js (500).
})

// POST /api/tareas
// TODO (Mínimo): crear una tarea con el título que llega en el cuerpo de la petición.
//   - Si el título falta, está vacío o tiene solo espacios: 400 { error: 'El título es obligatorio' }
//   - Si tiene más de 100 caracteres: 400 { error: 'El título no puede tener más de 100 caracteres' }
//   - El título se guarda sin espacios a los extremos.
//   - Cuando funcione: responde 201 con la tarea creada (con su _id).
// TODO (Reto): la tarea debe quedar guardada a nombre del usuario que la creó (req.usuario.id).
router.post('/', (req, res) => {
  res.status(501).json({ error: 'Falta implementar: crear tarea' })
})

// PATCH /api/tareas/:id
// TODO (Medio): actualizar la tarea que tiene ese id.
//   - Solo acepta titulo (mismas reglas que al crear) y completada (true o false). Ignora lo demás.
//   - Si el id no es válido: 400 { error: 'Id no válido' }
//   - Si completada no es true o false: 400 { error: 'completada debe ser true o false' }
//   - Si no llega ni titulo ni completada: 400 { error: 'Envía titulo o completada para actualizar' }
//   - Si la tarea no existe: 404 { error: 'Tarea no encontrada' }
//   - Cuando funcione: responde 200 con la tarea YA actualizada.
// TODO (Reto): un usuario solo puede actualizar sus propias tareas (req.usuario.id).
//   Si intenta cambiar una tarea ajena: 404 { error: 'Tarea no encontrada' }
router.patch('/:id', (req, res) => {
  res.status(501).json({ error: 'Falta implementar: actualizar tarea' })
})

// DELETE /api/tareas/:id
// TODO (Medio): borrar la tarea que tiene ese id.
//   - Si el id no es válido: 400 { error: 'Id no válido' }
//   - Si la tarea no existe: 404 { error: 'Tarea no encontrada' }
//   - Cuando funcione: responde 200 { mensaje: 'Tarea eliminada', id }
// TODO (Reto): un usuario solo puede borrar sus propias tareas (req.usuario.id).
//   Si intenta borrar una tarea ajena: 404 { error: 'Tarea no encontrada' }
router.delete('/:id', (req, res) => {
  res.status(501).json({ error: 'Falta implementar: eliminar tarea' })
})

export default router

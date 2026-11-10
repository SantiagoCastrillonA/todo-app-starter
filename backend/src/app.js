import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import tareasRoutes from './routes/tareas.routes.js'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tareas', tareasRoutes)

// Cualquier ruta que no exista llega aquí
app.use((req, res) => {
  res.status(404).json({ error: `La ruta ${req.method} ${req.originalUrl} no existe` })
})

// Middleware de errores: tiene 4 parámetros y va al final
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' })
  }

  console.error(err)
  res.status(500).json({ error: 'Algo salió mal en el servidor' })
})

export default app

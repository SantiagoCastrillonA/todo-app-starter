import mongoose from 'mongoose'
import app from './app.js'

const PORT = process.env.PORT || 3000
const { MONGODB_URI, JWT_SECRET } = process.env

if (!MONGODB_URI || !JWT_SECRET) {
  console.error('Faltan variables en backend/.env (MONGODB_URI y JWT_SECRET). Copia .env.example a .env y complétalo.')
  process.exit(1)
}

try {
  await mongoose.connect(MONGODB_URI)
  console.log('Conectado a MongoDB')

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('No se pudo conectar a MongoDB. ¿Está corriendo en tu computador?')
  console.error(error.message)
  process.exit(1)
}

import mongoose from 'mongoose'

const tareaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    completada: {
      type: Boolean,
      default: false
    },
    // Dueño de la tarea. Se usa en el nivel Reto para que cada quien vea solo sus tareas.
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Tarea', tareaSchema)

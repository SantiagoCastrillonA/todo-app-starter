import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      // La contraseña nunca sale en las consultas, salvo que se pida con .select('+password')
      select: false
    }
  },
  { timestamps: true }
)

export default mongoose.model('Usuario', usuarioSchema)

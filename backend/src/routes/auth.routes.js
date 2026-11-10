import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const router = Router()

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body ?? {}

  if (typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio' })
  }
  if (typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'El correo es obligatorio' })
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener mínimo 6 caracteres' })
  }

  const existe = await Usuario.findOne({ email: email.trim().toLowerCase() })
  if (existe) {
    return res.status(409).json({ error: 'Ese correo ya está registrado' })
  }

  const hash = await bcrypt.hash(password, 10)
  await Usuario.create({ nombre, email, password: hash })

  res.status(201).json({ mensaje: 'Cuenta creada. Ya puedes iniciar sesión' })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Escribe tu correo y tu contraseña' })
  }

  // Pedimos la contraseña explícitamente porque en el modelo tiene select: false
  const usuario = await Usuario.findOne({ email: email.trim().toLowerCase() }).select('+password')

  // Mismo mensaje en los dos casos para no revelar qué correos existen
  const passwordCorrecta = usuario && (await bcrypt.compare(password, usuario.password))
  if (!passwordCorrecta) {
    return res.status(401).json({ error: 'Correo o contraseña incorrectos' })
  }

  // El token guarda quién es el usuario y vence en 2 horas
  const token = jwt.sign(
    { id: usuario._id, nombre: usuario.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )

  res.json({
    token,
    usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
  })
})

export default router

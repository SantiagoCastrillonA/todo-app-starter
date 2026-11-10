import jwt from 'jsonwebtoken'

// Middleware: se ejecuta ANTES de la ruta protegida.
// Si el token es válido, deja pasar la petición con next().
// Si no, responde 401 y la ruta nunca se ejecuta.
export default function auth(req, res, next) {
  // El frontend manda el header así: Authorization: Bearer <token>
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' })
  }

  // Quitamos la palabra "Bearer " y nos quedamos solo con el token
  const token = header.slice(7)

  try {
    // jwt.verify revisa la firma con JWT_SECRET y que no esté vencido.
    // Si todo está bien, devuelve los datos que guardamos al hacer login.
    const datos = jwt.verify(token, process.env.JWT_SECRET)

    // Guardamos quién hizo la petición para que las rutas lo puedan usar
    req.usuario = { id: datos.id, nombre: datos.nombre }

    next()
  } catch {
    // jwt.verify lanza un error si el token fue modificado o ya venció
    return res.status(401).json({ error: 'Token inválido o vencido' })
  }
}

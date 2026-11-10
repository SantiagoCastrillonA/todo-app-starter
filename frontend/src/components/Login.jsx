import { useState } from 'react'
import { iniciarSesion, registrar } from '../api.js'

function Login({ onLogin }) {
  const [modoRegistro, setModoRegistro] = useState(false)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')
    setCargando(true)

    try {
      if (modoRegistro) {
        await registrar(nombre, email, password)
      }
      // Después de registrarse, inicia sesión automáticamente
      const datos = await iniciarSesion(email, password)
      onLogin(datos)
    } catch (err) {
      // fetch lanza TypeError cuando no logra conectarse (por ejemplo, si el backend está apagado)
      setError(err instanceof TypeError ? 'No se pudo conectar con el servidor. ¿Está encendido el backend?' : err.message)
      setCargando(false)
    }
  }

  function cambiarModo() {
    setModoRegistro(prev => !prev)
    setError('')
  }

  return (
    <section className="tarjeta login">
      <h1>Mis tareas</h1>
      <p className="subtitulo">
        {modoRegistro ? 'Crea tu cuenta para empezar' : 'Inicia sesión para ver tus tareas'}
      </p>

      <form className="formulario" onSubmit={manejarEnvio}>
        {modoRegistro && (
          <label>
            Nombre
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              required
            />
          </label>
        )}

        <label>
          Correo
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            autoComplete="email"
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete={modoRegistro ? 'new-password' : 'current-password'}
            minLength={modoRegistro ? 6 : undefined}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="boton-principal" disabled={cargando}>
          {cargando ? 'Un momento…' : modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>
      </form>

      <button type="button" className="boton-enlace" onClick={cambiarModo}>
        {modoRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Crea una'}
      </button>
    </section>
  )
}

export default Login

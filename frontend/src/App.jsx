import { useState } from 'react'
import Login from './components/Login.jsx'
import TodoList from './components/TodoList.jsx'

// Lee algo guardado en localStorage sin romper la app si falla
function leerGuardado(clave) {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : null
  } catch {
    return null
  }
}

function App() {
  // El estado empieza con lo que haya en localStorage: así la sesión sobrevive al recargar
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token')
    } catch {
      return null
    }
  })
  const [usuario, setUsuario] = useState(() => leerGuardado('usuario'))

  function manejarLogin(datos) {
    try {
      localStorage.setItem('token', datos.token)
      localStorage.setItem('usuario', JSON.stringify(datos.usuario))
    } catch {
      // Si el navegador no deja guardar, la sesión dura hasta recargar
    }
    setToken(datos.token)
    setUsuario(datos.usuario)
  }

  function cerrarSesion() {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
    } catch {
      // Nada que limpiar
    }
    setToken(null)
    setUsuario(null)
  }

  return (
    <main className="contenedor">
      {token ? (
        <TodoList usuario={usuario} onCerrarSesion={cerrarSesion} />
      ) : (
        <Login onLogin={manejarLogin} />
      )}
    </main>
  )
}

export default App

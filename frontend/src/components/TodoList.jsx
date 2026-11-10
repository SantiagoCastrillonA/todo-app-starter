import { useState } from 'react'
import NuevaTarea from './NuevaTarea.jsx'

function TodoList({ usuario, onCerrarSesion }) {
  // Las tareas que se muestran en pantalla. Por ahora empieza vacía y nunca cambia.
  const [tareas] = useState([])

  // TODO (Mínimo): cargar las tareas desde el backend cuando este componente aparece en pantalla.
  //   - Mientras cargan, se ve el mensaje "Cargando tareas…"
  //   - Si algo falla, se ve el mensaje de error que mandó el backend
  //   Cuando funcione: al recargar la página aparecen las tareas guardadas en MongoDB.

  // TODO (Mínimo): crear una tarea con el título que manda <NuevaTarea /> y agregarla a la lista.
  //   Cuando funcione: la tarea nueva aparece de primera en la lista sin recargar la página.
  async function agregarTarea(/* titulo */) {
    // Falta implementar
  }

  // TODO (Medio): una función que cambie una tarea de pendiente a hecha (y al revés)
  //   y otra que la quite de la lista. Las dos se le pasan a cada <TareaItem /> como onToggle y onEliminar.
  //   Cuando funcione: los cambios se ven sin recargar y se mantienen al recargar.

  // EXTRA (opcional): botones de filtro "Todas", "Pendientes" y "Hechas" para ver solo parte de la lista,
  //   y un contador que diga cuántas tareas quedan pendientes.
  //   Los estilos ya existen en index.css: .barra, .contador, .filtros, .filtro y .filtro.activo

  return (
    <section className="tarjeta">
      <header className="encabezado">
        <h1>Hola, {usuario?.nombre}</h1>
        <button type="button" className="boton-secundario" onClick={onCerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      <NuevaTarea onCrear={agregarTarea} />

      {/* TODO (Mínimo): mostrar "Cargando tareas…" mientras cargan y el mensaje de error si algo falla */}

      {tareas.length === 0 && <p className="mensaje">No tienes tareas todavía</p>}

      {/* TODO (Mínimo): pintar la lista de tareas dentro de un <ul className="lista">.
          Cada tarea se muestra con el componente <TareaItem />.
          Cuando funcione: se ven todas las tareas, de la más nueva a la más vieja. */}
    </section>
  )
}

export default TodoList

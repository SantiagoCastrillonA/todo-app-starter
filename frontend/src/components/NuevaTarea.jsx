// TODO (Mínimo): recibir la prop onCrear que manda <TodoList />.
function NuevaTarea(/* { onCrear } */) {
  // TODO (Mínimo): guardar en un estado lo que la persona escribe en el input.

  function manejarEnvio(evento) {
    // Evita que el formulario recargue la página
    evento.preventDefault()

    // TODO (Mínimo): completar el envío.
    //   - Si el título está vacío o tiene solo espacios, no se envía nada.
    //   - Si tiene texto, se le pasa a onCrear.
    //   Cuando funcione: la tarea aparece en la lista y el input queda vacío.
  }

  return (
    <form className="nueva-tarea" onSubmit={manejarEnvio}>
      {/* TODO (Mínimo): convertir este input en un input controlado (value + onChange) */}
      <input
        type="text"
        placeholder="¿Qué tienes que hacer?"
        maxLength={100}
        aria-label="Nueva tarea"
      />
      <button type="submit" className="boton-principal">
        Agregar
      </button>
    </form>
  )
}

export default NuevaTarea

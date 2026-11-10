// TODO (Medio): recibir también onToggle y onEliminar por props y conectarlos:
//   - Al marcar o desmarcar el checkbox se llama onToggle con la tarea.
//   - Al hacer clic en "Eliminar" se llama onEliminar con el _id de la tarea.
//   Cuando funcione: el checkbox tacha la tarea, el botón la quita, y los dos cambios se mantienen al recargar.
function TareaItem({ tarea }) {
  return (
    <li className="tarea">
      <label className="tarea-check">
        {/* readOnly evita un aviso de React mientras el checkbox no está conectado */}
        <input type="checkbox" checked={tarea.completada} readOnly />
        <span className={tarea.completada ? 'titulo completada' : 'titulo'}>
          {tarea.titulo}
        </span>
      </label>
      <button type="button" className="boton-eliminar">
        Eliminar
      </button>
    </li>
  )
}

export default TareaItem

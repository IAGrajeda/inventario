function Historial({ movimientos, filtroTipo, filtroProducto }) {
  // Aplica ambos filtros
  let movimientosFiltrados = movimientos;

  if (filtroTipo !== "todos") {
    movimientosFiltrados = movimientosFiltrados.filter((m) => m.tipoMovimiento === filtroTipo);
  }

  if (filtroProducto !== "todos") {
    movimientosFiltrados = movimientosFiltrados.filter((m) => m.producto.nombre === filtroProducto);
  }

  return (
    <div className="h-[80vh] overflow-y-auto border border-gray-700 p-4 rounded bg-gray-800 shadow-lg">
      <ul className="flex flex-col gap-3">
        {[...movimientosFiltrados].reverse().map((m) => (
          <li
            key={m.idMovimiento}
            className="border border-gray-600 rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex justify-between items-center p-3">
              <div>
                <span className={`font-bold ${m.rol === "Almacenista" ? "text-yellow-400" : "text-green-400"}`}>
                  {m.usuario} ({m.rol})
                </span>
                <span className="text-gray-400 ml-1">({m.tipoMovimiento})</span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(m.fechaHora).toLocaleString()}
              </div>
            </div>
            <div className="px-3 pb-3 text-gray-300">
              <span className="font-semibold">{m.producto.nombre}</span> — Cantidad:{" "}
              <span className="font-bold">{m.cantidadMovida}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;
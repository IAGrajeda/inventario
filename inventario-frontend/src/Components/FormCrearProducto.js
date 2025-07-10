import { useState } from "react";
import { crearProducto } from "../services/productService";

function FormCrearProducto({ onProductoCreado, onMovimientoCreado, usuarioActual }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [estatus, setEstatus] = useState("activo");

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!nombre || cantidad <= 0) {
    alert("El nombre es obligatorio y la cantidad debe ser mayor a 0.");
    return;
  }

  await crearProducto(nombre, cantidad, estatus, usuarioActual.usuario, usuarioActual.rol);
  setNombre("");
  setCantidad(0);
  setEstatus("activo");
  onProductoCreado();
  onMovimientoCreado();
  setIsOpen(false);
};

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
      >
        Agregar producto
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-600">
            <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">Nuevo producto</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                placeholder="Cantidad inicial"
                className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={estatus}
                onChange={(e) => setEstatus(e.target.value)}
                className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormCrearProducto;

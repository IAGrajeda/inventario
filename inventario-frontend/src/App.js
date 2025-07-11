import { useEffect, useState } from "react";
import { obtenerProductos, agregarInventario, sacarInventario, darDeBaja, reactivarProducto, obtenerMovimientos } from "./services/productService";
import FormCrearProducto from "./Components/FormCrearProducto";
import Historial from "./Components/Historial";
import Login from "./Components/Login";
import ModalEntrada from "./Components/ModalEntrada";

function App() {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalTipo, setModalTipo] = useState("entrada");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroProducto, setFiltroProducto] = useState("todos");

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  const cargarMovimientos = async () => {
    try {
      const data = await obtenerMovimientos();
      setMovimientos(data);
    } catch (error) {
      console.error("Error al cargar movimientos", error);
    }
  };

  useEffect(() => {
    if (usuarioActual) {
      cargarProductos();
      cargarMovimientos();
    }
  }, [usuarioActual]);

  const handleBaja = async (id) => {
    try {
      await darDeBaja(id, usuarioActual.usuario, usuarioActual.rol);
      await cargarProductos();
      await cargarMovimientos();
    } catch (error) {
      console.error("Error al dar de baja el producto", error);
    }
  };

  const handleReactivar = async (id) => {
    try {
      await reactivarProducto(id, usuarioActual.usuario, usuarioActual.rol);
      await cargarProductos();
      await cargarMovimientos();
    } catch (error) {
      console.error("Error al reactivar", error);
    }
  };

  const handleLogin = ({ usuario, rol }) => {
    setUsuarioActual({ usuario, rol });
  };

  if (!usuarioActual) {
    return <Login onLogin={handleLogin} />;
  }

  const handleLogout = () => {
    setUsuarioActual(null);
  };

  const handleEntradaClick = (producto) => {
    setProductoSeleccionado(producto);
    setModalTipo("entrada");
    setModalOpen(true);
  };

  const handleSalidaClick = (producto) => {
    setProductoSeleccionado(producto);
    setModalTipo("salida");
    setModalOpen(true);
  };

  const handleConfirm = async (cantidad) => {
    try {
      if (modalTipo === "entrada") {
        await agregarInventario(productoSeleccionado.idProducto, cantidad, usuarioActual.usuario, usuarioActual.rol);
      } else {
        if (cantidad > productoSeleccionado.cantidad) {
          alert("No puedes sacar más de la cantidad disponible");
          return;
        }
        await sacarInventario(productoSeleccionado.idProducto, cantidad, usuarioActual.usuario, usuarioActual.rol);
      }
      await cargarProductos();
      await cargarMovimientos();
      setModalOpen(false);
      setProductoSeleccionado(null);
    } catch (error) {
      console.error("Error al actualizar inventario", error);
    }
  };

  const productosVisibles = usuarioActual.rol === "Almacenista"
    ? productos.filter((p) => p.estatus === "activo")
    : productos;

  return (
    <div className="flex justify-around flex-col md:flex-row gap-4 p-4">
      <div className="md:w-2/3">
        <div className="text-center justify-around bg-slate-800 border border-gray-700 mb-2 flex items-center p-2 h-12">
          <h1 className="text-xl font-bold text-white">
            Bienvenido: {usuarioActual.usuario} ({usuarioActual.rol})
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Salir
          </button>
        </div>

        <div className="border border-gray-600 p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex justify-around">
            <h1 className="font-bold text-3xl text-green-400 text-center">Inventario</h1>
            {usuarioActual.rol === "Administrador" && (
              <FormCrearProducto
                onProductoCreado={cargarProductos}
                onMovimientoCreado={cargarMovimientos}
                usuarioActual={usuarioActual}
              />
            )}
          </div>

          <ul className="flex flex-col gap-4 mt-6 max-h-[72vh] overflow-y-auto pr-2">
            {productosVisibles.map((p) => (
              <li
                key={p.idProducto}
                className="border border-gray-600 rounded-lg bg-gray-900 p-4 flex flex-col gap-2 shadow hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white">{p.nombre}</span> —
                    <span className="ml-1 text-gray-300">Cantidad: {p.cantidad}</span> —
                    <span className="ml-1 text-gray-400 italic">{p.estatus}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {usuarioActual.rol === "Administrador" && (
                    <button
                      onClick={() => handleEntradaClick(p)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Entrada
                    </button>
                  )}
                  {usuarioActual.rol === "Almacenista" && (
                    <button
                      onClick={() => handleSalidaClick(p)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Salida
                    </button>
                  )}
                  {usuarioActual.rol === "Administrador" && (
                    p.estatus === "activo" ? (
                      <button
                        onClick={() => handleBaja(p.idProducto)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Dar de baja
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReactivar(p.idProducto)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Reactivar
                      </button>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {usuarioActual.rol === "Administrador" && (
        <div className="md:w-1/3">
          <h3 className="text-center font-semibold text-2xl flex items-center justify-center bg-slate-800 border border-gray-700 mb-2 h-12">
            Historial
          </h3>

          <div className="flex justify-center mb-2">
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="todos">Todos</option>
              <option value="Entrada">Entrada</option>
              <option value="Salida">Salida</option>
              <option value="Creacion">Creación</option>
              <option value="Baja">Baja</option>
              <option value="Reactivar">Reactivar</option>
            </select>

            <select
              value={filtroProducto}
              onChange={(e) => setFiltroProducto(e.target.value)}
              className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="todos">Todos los productos</option>
              {productos.map((p) => (
                <option key={p.idProducto} value={p.nombre}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <Historial movimientos={movimientos} filtroTipo={filtroTipo} filtroProducto={filtroProducto} />
        </div>
      )}

      <ModalEntrada
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        tipo={modalTipo}
      />
    </div>
  );
}

export default App;

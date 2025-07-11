import { useState } from "react";

function ModalEntrada({ isOpen, onClose, onConfirm, tipo = "entrada" }) {
  const [cantidad, setCantidad] = useState(1);

  const handleConfirm = () => {
    if (cantidad <= 0) {
      alert("La cantidad debe ser mayor a cero");
      return;
    }
    onConfirm(cantidad);
    setCantidad(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-600">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          {tipo === "entrada" ? "Agregar Entrada" : "Registrar Salida"}
        </h2>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          placeholder="Cantidad"
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEntrada;
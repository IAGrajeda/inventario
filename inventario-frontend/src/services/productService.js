import api from "../api";

export const obtenerProductos = async () => {
  const res = await api.get("/productos");
  return res.data;
};

export const crearProducto = async (nombre, cantidad, estatus, usuario, rol) => {
  const res = await api.post("/productos", { nombre, cantidad, estatus, usuario, rol});
  return res.data;
};

export const agregarInventario = async (id, cantidad, usuario, rol) => {
  const res = await api.put(`/productos/${id}/entrada`, null, {
    params: { cantidad, usuario, rol },
  });
  return res.data;
};

export const sacarInventario = async (id, cantidad, usuario, rol) => {
  const res = await api.put(`/productos/${id}/salida`, null, {
    params: { cantidad, usuario, rol },
  });
  return res.data;
};

export const darDeBaja = async (id, usuario, rol) => {
  const res = await api.put(`/productos/${id}/baja`, null, {
    params: { usuario, rol },
  });
  return res.data;
};

export const reactivarProducto = async (id, usuario, rol) => {
  const res = await api.put(`/productos/${id}/reactivar`, null, {
    params: { usuario, rol},
  });
  return res.data;
};

export const obtenerMovimientos = async (tipo = null) => {
  const res = await api.get("/movimientos", {
    params: { tipo },
  });
  return res.data;
};

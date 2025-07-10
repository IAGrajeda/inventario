package com.castores.inventario.controller;
import com.castores.inventario.model.Movimiento;
import com.castores.inventario.model.Producto;
import com.castores.inventario.model.DTOProducto;
import com.castores.inventario.repository.MovimientoRepository;
import com.castores.inventario.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.PutExchange;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private MovimientoRepository movimientoRepository;


    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto crearProducto(@RequestBody DTOProducto dtoproducto) {
        Producto producto = new Producto();
        producto.setNombre(dtoproducto.getNombre());

        if (producto.getCantidad() == null || producto.getCantidad() < 0) {
            producto.setCantidad(0);
        }
        if (producto.getEstatus() == null || producto.getEstatus().isEmpty()) {
            producto.setEstatus("activo");
        }

        Producto nuevoProducto = productoRepository.save(producto);
        // Registrar movimiento
        Movimiento movimiento = new Movimiento();
        movimiento.setProducto(nuevoProducto);
        movimiento.setTipoMovimiento("Creacion");
        movimiento.setCantidadMovida(producto.getCantidad());
        movimiento.setUsuario(dtoproducto.getUsuario());
        movimiento.setRol(dtoproducto.getRol());
        movimiento.setFechaHora(LocalDateTime.now());
        movimientoRepository.save(movimiento);
        return nuevoProducto;
    }

    @PutMapping("/{id}/entrada")
    public Producto agregarInventario(@PathVariable Long id, @RequestParam Integer cantidad, @RequestParam String usuario, @RequestParam String rol){
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setCantidad(producto.getCantidad() + cantidad);
        productoRepository.save(producto);

        //creacion del movimiento
        Movimiento movimiento = new Movimiento();
        movimiento.setProducto(producto);
        movimiento.setTipoMovimiento("Entrada");
        movimiento.setCantidadMovida(cantidad);
        movimiento.setUsuario(usuario);
        movimiento.setRol(rol);
        movimiento.setFechaHora(LocalDateTime.now());
        movimientoRepository.save(movimiento);
        return producto;
    }

    @PutMapping("/{id}/salida")
    public Producto sacarInventario(@PathVariable Long id, @RequestParam Integer cantidad, @RequestParam String usuario, @RequestParam String rol) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (producto.getCantidad() < cantidad) {
            throw new RuntimeException("No hay suficiente inventario para retirar");
        }

        producto.setCantidad(producto.getCantidad() - cantidad);
        productoRepository.save(producto);

        Movimiento movimiento = new Movimiento();
        movimiento.setProducto(producto);
        movimiento.setTipoMovimiento("Salida");
        movimiento.setCantidadMovida(cantidad);
        movimiento.setUsuario(usuario);
        movimiento.setRol(rol);
        movimiento.setFechaHora(LocalDateTime.now());
        movimientoRepository.save(movimiento);
        return producto;
    }

    @PutMapping("/{id}/baja")
    public Producto darDeBaja(@PathVariable Long id, @RequestParam String usuario, @RequestParam String rol) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setEstatus("inactivo");
        productoRepository.save(producto);

        // Registrar movimiento
        Movimiento movimiento = new Movimiento();
        movimiento.setProducto(producto);
        movimiento.setTipoMovimiento("Baja");
        movimiento.setCantidadMovida(0);
        movimiento.setUsuario(usuario);
        movimiento.setRol(rol);
        movimiento.setFechaHora(LocalDateTime.now());
        movimientoRepository.save(movimiento);
        return producto;
    }

    @PutMapping("/{id}/reactivar")
    public Producto reactivarProducto(@PathVariable Long id, @RequestParam String usuario, @RequestParam String rol) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setEstatus("activo");
        productoRepository.save(producto);

        // Registrar movimiento
        Movimiento movimiento = new Movimiento();
        movimiento.setProducto(producto);
        movimiento.setTipoMovimiento("Reactivar");
        movimiento.setCantidadMovida(0);
        movimiento.setUsuario(usuario);
        movimiento.setRol(rol);
        movimiento.setFechaHora(LocalDateTime.now());
        movimientoRepository.save(movimiento);
        return producto;
    }
}

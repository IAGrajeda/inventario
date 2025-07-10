package com.castores.inventario.controller;

import com.castores.inventario.model.Movimiento;
import com.castores.inventario.repository.MovimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "*")
public class MovimientoController {

    @Autowired
    private MovimientoRepository movimientoRepository;

    @GetMapping
    public List<Movimiento> listar(@RequestParam(required = false) String tipo) {
        if (tipo != null) {
            return movimientoRepository.findByTipoMovimiento(tipo);
        }
        return movimientoRepository.findAll();
    }
}

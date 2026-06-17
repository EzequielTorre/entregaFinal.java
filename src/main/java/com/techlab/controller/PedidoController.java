package com.techlab.controller;

import com.techlab.pedidos.Pedido;
import com.techlab.pedidos.LineaPedido;
import com.techlab.service.TiendaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final TiendaService tiendaService;

    public PedidoController(TiendaService tiendaService) {
        this.tiendaService = tiendaService;
    }

    @GetMapping
    public List<Pedido> listar() {
        return tiendaService.listarPedidos();
    }

    @PostMapping
    public Pedido crear(@RequestBody List<LineaPedido> lineas) {
        return tiendaService.crearPedido(lineas);
    }
}

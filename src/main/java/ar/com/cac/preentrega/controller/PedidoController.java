package ar.com.cac.preentrega.controller;

import ar.com.cac.preentrega.exception.StockInsuficienteException;
import ar.com.cac.preentrega.model.LineaPedido;
import ar.com.cac.preentrega.model.Pedido;
import ar.com.cac.preentrega.service.TiendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private TiendaService tiendaService;

    @GetMapping
    public List<Pedido> listar() {
        return tiendaService.listarPedidos();
    }

    @PostMapping
    public Pedido crear(@RequestBody List<LineaPedido> lineas) throws StockInsuficienteException {
        return tiendaService.crearPedido(lineas);
    }
}

package com.techlab.controller;

import com.techlab.productos.Producto;
import com.techlab.service.TiendaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final TiendaService tiendaService;

    public ProductoController(TiendaService tiendaService) {
        this.tiendaService = tiendaService;
    }

    @GetMapping
    public List<Producto> listar() {
        return tiendaService.listarProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(tiendaService.buscarProductoPorId(id));
    }

    @GetMapping("/buscar")
    public List<Producto> buscarPorNombre(@RequestParam String nombre) {
        return tiendaService.buscarProductosPorNombre(nombre);
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return tiendaService.guardarProducto(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        return ResponseEntity.ok(tiendaService.actualizarProducto(id, producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        tiendaService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}

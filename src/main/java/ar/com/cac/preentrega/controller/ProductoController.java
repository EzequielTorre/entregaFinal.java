package ar.com.cac.preentrega.controller;

import ar.com.cac.preentrega.exception.ProductoNoEncontradoException;
import ar.com.cac.preentrega.model.Producto;
import ar.com.cac.preentrega.model.ProductoElectronico;
import ar.com.cac.preentrega.model.ProductoPerecedero;
import ar.com.cac.preentrega.service.TiendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private TiendaService tiendaService;

    @GetMapping
    public List<Producto> listar() {
        return tiendaService.listarProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscar(@PathVariable Long id) throws ProductoNoEncontradoException {
        return ResponseEntity.ok(tiendaService.buscarProductoPorId(id));
    }

    @PostMapping("/electronico")
    public Producto guardarElectronico(@RequestBody ProductoElectronico producto) {
        return tiendaService.guardarProducto(producto);
    }

    @PostMapping("/perecedero")
    public Producto guardarPerecedero(@RequestBody ProductoPerecedero producto) {
        return tiendaService.guardarProducto(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto producto) throws ProductoNoEncontradoException {
        Producto existente = tiendaService.buscarProductoPorId(id);
        existente.setNombre(producto.getNombre());
        existente.setPrecio(producto.getPrecio());
        existente.setStock(producto.getStock());
        existente.setCategoria(producto.getCategoria());
        return ResponseEntity.ok(tiendaService.guardarProducto(existente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        tiendaService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}

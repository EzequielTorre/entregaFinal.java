package ar.com.cac.preentrega.controller;

import ar.com.cac.preentrega.model.Categoria;
import ar.com.cac.preentrega.service.TiendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private TiendaService tiendaService;

    @GetMapping
    public List<Categoria> listar() {
        return tiendaService.listarCategorias();
    }

    @PostMapping
    public Categoria guardar(@RequestBody Categoria categoria) {
        return tiendaService.guardarCategoria(categoria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        tiendaService.eliminarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}

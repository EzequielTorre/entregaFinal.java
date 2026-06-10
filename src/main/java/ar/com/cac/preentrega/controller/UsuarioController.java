package ar.com.cac.preentrega.controller;

import ar.com.cac.preentrega.model.Usuario;
import ar.com.cac.preentrega.service.TiendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private TiendaService tiendaService;

    @GetMapping
    public List<Usuario> listar() {
        return tiendaService.listarUsuarios();
    }

    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        return tiendaService.guardarUsuario(usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        tiendaService.eliminarUsuario(id);
    }
}

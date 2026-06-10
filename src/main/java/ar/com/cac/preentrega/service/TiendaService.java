package ar.com.cac.preentrega.service;

import ar.com.cac.preentrega.exception.ProductoNoEncontradoException;
import ar.com.cac.preentrega.exception.StockInsuficienteException;
import ar.com.cac.preentrega.model.*;
import ar.com.cac.preentrega.repository.CategoriaRepository;
import ar.com.cac.preentrega.repository.PedidoRepository;
import ar.com.cac.preentrega.repository.ProductoRepository;
import ar.com.cac.preentrega.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TiendaService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Gestión de Productos
    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    public Producto buscarProductoPorId(Long id) throws ProductoNoEncontradoException {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException("Producto con ID " + id + " no encontrado."));
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    // Gestión de Categorías
    public Categoria guardarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    public void eliminarCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }

    // Gestión de Pedidos
    @Transactional
    public Pedido crearPedido(List<LineaPedido> lineas) throws StockInsuficienteException {
        for (LineaPedido linea : lineas) {
            Producto p = productoRepository.findById(linea.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado durante el pedido"));
            
            if (p.getStock() < linea.getCantidad()) {
                throw new StockInsuficienteException("Stock insuficiente para el producto: " + p.getNombre() + 
                        " (Disponible: " + p.getStock() + ", Solicitado: " + linea.getCantidad() + ")");
            }
            
            p.setStock(p.getStock() - linea.getCantidad());
            productoRepository.save(p);
            linea.setProducto(p);
        }

        Pedido nuevoPedido = new Pedido();
        lineas.forEach(nuevoPedido::agregarLinea);
        
        return pedidoRepository.save(nuevoPedido);
    }

    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    // Gestión de Usuarios
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}

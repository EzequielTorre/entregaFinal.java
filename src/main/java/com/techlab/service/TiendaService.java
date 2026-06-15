package com.techlab.service;

import com.techlab.excepciones.ProductoNoEncontradoException;
import com.techlab.excepciones.StockInsuficienteException;
import com.techlab.pedidos.LineaPedido;
import com.techlab.pedidos.Pedido;
import com.techlab.productos.Producto;
import com.techlab.repository.PedidoRepository;
import com.techlab.repository.ProductoRepository;
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

    // ========== PRODUCTOS ==========
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    public Producto buscarProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException("Producto con ID " + id + " no encontrado"));
    }

    public List<Producto> buscarProductosPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto(Long id, Producto productoActualizado) {
        Producto producto = buscarProductoPorId(id);
        producto.setNombre(productoActualizado.getNombre());
        producto.setDescripcion(productoActualizado.getDescripcion());
        producto.setPrecio(productoActualizado.getPrecio());
        producto.setCategoria(productoActualizado.getCategoria());
        producto.setImagen(productoActualizado.getImagen());
        producto.setStock(productoActualizado.getStock());
        return productoRepository.save(producto);
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    // ========== PEDIDOS ==========
    @Transactional
    public Pedido crearPedido(List<LineaPedido> lineas) {
        for (LineaPedido linea : lineas) {
            Producto producto = productoRepository.findById(linea.getProducto().getId())
                    .orElseThrow(() -> new ProductoNoEncontradoException("Producto no encontrado"));

            if (producto.getStock() < linea.getCantidad()) {
                throw new StockInsuficienteException(
                        "Stock insuficiente para: " + producto.getNombre() +
                        " (Disponible: " + producto.getStock() + ", Solicitado: " + linea.getCantidad() + ")"
                );
            }
        }

        Pedido pedido = new Pedido();
        for (LineaPedido linea : lineas) {
            Producto producto = productoRepository.findById(linea.getProducto().getId()).orElseThrow();
            producto.setStock(producto.getStock() - linea.getCantidad());
            productoRepository.save(producto);

            linea.setProducto(producto);
            pedido.agregarLinea(linea);
        }

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }
}

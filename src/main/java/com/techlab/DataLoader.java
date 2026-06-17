package com.techlab;

import com.techlab.productos.Producto;
import com.techlab.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductoRepository productoRepository;

    public DataLoader(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Si ya hay productos, no volvemos a cargarlos
        if (productoRepository.count() == 0) {
            // Agregamos productos de ejemplo
            Producto p1 = new Producto(
                "Laptop Gamer",
                "Laptop con procesador Intel i7, 16GB RAM y 1TB SSD",
                1499.99,
                "Electrónica",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
                10
            );
            Producto p2 = new Producto(
                "Monitor 27\"",
                "Monitor Full HD con tasa de refresco de 144Hz",
                299.99,
                "Electrónica",
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
                25
            );
            Producto p3 = new Producto(
                "Teclado Mecánico RGB",
                "Teclado mecánico con switches Red y iluminación RGB",
                99.99,
                "Electrónica",
                "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&h=500&fit=crop",
                50
            );
            Producto p4 = new Producto(
                "Mouse Inalámbrico",
                "Mouse ergonómico inalámbrico con 3200 DPI",
                29.99,
                "Electrónica",
                "https://images.unsplash.com/photo-1614252235316-6c764983a501?w=500&h=500&fit=crop",
                75
            );
            Producto p5 = new Producto(
                "Silla Gamer",
                "Silla ergonómica reclinable y con reposacabezas",
                399.99,
                "Muebles",
                "https://images.unsplash.com/photo-1580480055396-f060d03014a9?w=500&h=500&fit=crop",
                8
            );

            productoRepository.save(p1);
            productoRepository.save(p2);
            productoRepository.save(p3);
            productoRepository.save(p4);
            productoRepository.save(p5);

            System.out.println("Productos de ejemplo cargados correctamente!");
        }
    }
}

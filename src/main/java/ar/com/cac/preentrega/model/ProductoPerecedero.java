package ar.com.cac.preentrega.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PERECEDERO")
public class ProductoPerecedero extends Producto {
    private int diasParaVencer;

    public ProductoPerecedero() {
    }

    public ProductoPerecedero(String nombre, double precio, int stock, int diasParaVencer) {
        super(nombre, precio, stock);
        this.diasParaVencer = diasParaVencer;
    }

    public int getDiasParaVencer() {
        return diasParaVencer;
    }

    public void setDiasParaVencer(int diasParaVencer) {
        this.diasParaVencer = diasParaVencer;
    }

    @Override
    public String getTipo() {
        return "Perecedero";
    }
}

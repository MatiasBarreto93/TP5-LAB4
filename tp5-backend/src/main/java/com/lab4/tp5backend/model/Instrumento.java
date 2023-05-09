package com.lab4.tp5backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "instrumento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Instrumento extends GenericEntity {

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "marca")
    private String marca;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "costo_envio")
    private String costoEnvio;

    @Column(name = "cantidad_vendida")
    private Integer cantidadVendida;

    @Column(name = "descripcion")
    private String descripcion;

}


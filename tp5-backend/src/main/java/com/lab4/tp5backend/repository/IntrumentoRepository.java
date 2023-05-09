package com.lab4.tp5backend.repository;

import com.lab4.tp5backend.model.Instrumento;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IntrumentoRepository extends GenericRepository<Instrumento, Long> {

    @Query("select i from Instrumento i where i.nombre like %:filtro% or i.marca like %:filtro% or i.modelo like %:filtro%")
    List<Instrumento> search(@Param("filtro") String filtro);

}

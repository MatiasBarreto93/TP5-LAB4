package com.lab4.tp5backend.repository;

import com.lab4.tp5backend.model.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntrumentoRepository extends JpaRepository<Instrumento, Long> {

}

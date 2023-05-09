package com.lab4.tp5backend.service;

import com.lab4.tp5backend.model.Instrumento;

import java.util.List;

public interface InstrumentoService extends GenericService<Instrumento, Long>{

    List<Instrumento> search(String filtro) throws Exception;

}

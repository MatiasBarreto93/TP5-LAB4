package com.lab4.tp5backend.service;


import com.lab4.tp5backend.model.Instrumento;

import java.util.List;

public interface IInstrumentoService {

    public List<Instrumento> getList();

    public Instrumento getByID(long id);

    public Instrumento save(Instrumento instrumento);

    public Instrumento update(Instrumento instrumento);

    public void delete(long id);
}

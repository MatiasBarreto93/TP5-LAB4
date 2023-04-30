package com.lab4.tp5backend.service;

import com.lab4.tp5backend.model.Instrumento;
import com.lab4.tp5backend.repository.IntrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class InstrumentoService implements IInstrumentoService{

    @Autowired
    IntrumentoRepository intrumentoRepository;

    @Override
    public List<Instrumento> getList() {
        return intrumentoRepository.findAll();
    }

    @Override
    public Instrumento getByID(long id) {
        return intrumentoRepository.findById(id).orElse(null);
    }

    @Override
    public Instrumento save(Instrumento instrumento) {
        return intrumentoRepository.save(instrumento);
    }

    @Override
    public Instrumento update(Instrumento instrumento) {
        return intrumentoRepository.save(instrumento);
    }

    @Override
    public void delete(long id) {
        intrumentoRepository.deleteById(id);
    }
}

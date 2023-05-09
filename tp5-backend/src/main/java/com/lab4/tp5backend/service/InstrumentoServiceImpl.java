package com.lab4.tp5backend.service;

import com.lab4.tp5backend.model.Instrumento;
import com.lab4.tp5backend.repository.GenericRepository;
import com.lab4.tp5backend.repository.IntrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstrumentoServiceImpl extends GenericServiceImpl<Instrumento, Long> implements InstrumentoService {

    @Autowired
    private IntrumentoRepository intrumentoRepository;

    public InstrumentoServiceImpl(GenericRepository<Instrumento, Long> genericRepository) {
        super(genericRepository);
    }
}

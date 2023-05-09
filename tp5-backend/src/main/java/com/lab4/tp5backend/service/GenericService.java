package com.lab4.tp5backend.service;

import com.lab4.tp5backend.model.GenericEntity;

import java.io.Serializable;
import java.util.List;

public interface GenericService<E extends GenericEntity, ID extends Serializable> {
    public List<E> findAll() throws Exception;
    public E findById(ID id) throws Exception;
    public E save(E entity) throws Exception;
    public E update(ID id, E entity) throws Exception;
    public boolean delete(ID id) throws Exception;
}
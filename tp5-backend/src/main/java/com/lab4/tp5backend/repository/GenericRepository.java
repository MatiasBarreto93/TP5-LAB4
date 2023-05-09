package com.lab4.tp5backend.repository;

import com.lab4.tp5backend.model.GenericEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
public interface GenericRepository<E extends GenericEntity, ID extends Serializable> extends JpaRepository <E, ID> {
}

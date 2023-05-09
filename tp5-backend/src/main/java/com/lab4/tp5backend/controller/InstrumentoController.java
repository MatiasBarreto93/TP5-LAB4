package com.lab4.tp5backend.controller;

import com.lab4.tp5backend.model.Instrumento;
import com.lab4.tp5backend.service.InstrumentoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/instrumentos")
public class InstrumentoController extends GenericControllerImpl<Instrumento, InstrumentoServiceImpl>{

    private static final String ERROR_MESSAGE = "{\"error\":\"Error. Por favor intente nuevamente.\"}";

    //Get All @GET
    //http://localhost:8080/api/v1/instrumentos

    //Get One @GET
    //http://localhost:8080/api/v1/instrumentos/id

    //Create @POST
    //http://localhost:8080/api/v1/instrumentos + JSON

    //Update @PUT
    //http://localhost:8080/api/v1/instrumentos/id + JSON

    //Delete @DELETE
    //http://localhost:8080/api/v1/instrumentos/id

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String filtro){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.search(filtro));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ERROR_MESSAGE);
        }
    }
}

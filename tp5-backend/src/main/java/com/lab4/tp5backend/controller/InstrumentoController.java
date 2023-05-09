package com.lab4.tp5backend.controller;

import com.lab4.tp5backend.model.Instrumento;
import com.lab4.tp5backend.service.InstrumentoServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/instrumentos")
public class InstrumentoController extends GenericControllerImpl<Instrumento, InstrumentoServiceImpl>{

    //Get All @GET
    //http://localhost:8080/api/v1/roles

    //Get One @GET
    //http://localhost:8080/api/v1/roles/id

    //Create @POST
    //http://localhost:8080/api/v1/roles + JSON

    //Update @PUT
    //http://localhost:8080/api/v1/roles/id + JSON

    //Delete @DELETE
    //http://localhost:8080/api/v1/roles/id

}

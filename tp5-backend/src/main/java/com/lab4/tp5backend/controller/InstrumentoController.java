package com.lab4.tp5backend.controller;

import com.lab4.tp5backend.model.Instrumento;
import com.lab4.tp5backend.service.InstrumentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class InstrumentoController {

    final InstrumentoService instrumentoService;

    public InstrumentoController(InstrumentoService instrumentoService) {
        this.instrumentoService = instrumentoService;
    }

    @RequestMapping("/")
    @CrossOrigin(origins = "http://localhost:5173")
    public String helloWorld(){
        return "Hello World from Spring Boot";
    }

    @GetMapping("/instrumentos")
    @CrossOrigin(origins = "http://localhost:5173")
    public List<Instrumento> listaInstrumentos(){
        return instrumentoService.getList();
    }

    @GetMapping("/instrumento/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Instrumento> obtenerInstrumento(@PathVariable long id){
        Instrumento instrumentoId = instrumentoService.getByID(id);
        return ResponseEntity.ok(instrumentoId);
    }

    @PostMapping("/instrumento/guardar")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Instrumento> guardarInstrumento(@RequestBody Instrumento instrumento){
        Instrumento nuevoInstrumento = instrumentoService.save(instrumento);
        return new ResponseEntity<>(nuevoInstrumento, HttpStatus.CREATED);
    }

    @PutMapping("/instrumento/actualizar/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Instrumento> actualizarInstrumento(@PathVariable long id ,@RequestBody Instrumento instrumento){
        Instrumento nuevoInstrumento = instrumentoService.getByID(id);
        //Todos los get & set
        nuevoInstrumento.setNombre(instrumento.getNombre());
        return new ResponseEntity<>(nuevoInstrumento, HttpStatus.CREATED);
    }

    @DeleteMapping("/instrumento/borrar/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<HashMap<String, Boolean>> eliminarInstrumento(@PathVariable long id){
        this.instrumentoService.delete(id);
        HashMap<String, Boolean> estadoInstrumento = new HashMap<>();
        estadoInstrumento.put("Eliminado", true);
        return ResponseEntity.ok(estadoInstrumento);
    }
}

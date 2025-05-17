package br.com.fecaf.controller;

import br.com.fecaf.model.Modelo;
import br.com.fecaf.services.ModeloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/modelos") // Padronizado com "/api"
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class ModeloController {

    @Autowired
    private ModeloService service;

    @GetMapping
    public List<Modelo> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Modelo> cadastrar(@RequestBody Modelo modelo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(modelo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modelo> atualizar(@PathVariable int id, @RequestBody Modelo modelo) {
        modelo.setId(id);
        return ResponseEntity.ok(service.atualizar(modelo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Modelo> buscarPorId(@PathVariable int id) {
        Optional<Modelo> modelo = service.buscarPorId(id);
        return modelo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

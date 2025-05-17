package br.com.fecaf.controller;

import br.com.fecaf.model.Marca;
import br.com.fecaf.services.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/marcas") // Padronizado com "/api"
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class MarcaController {

    @Autowired
    private MarcaService service;

    @GetMapping
    public List<Marca> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Marca> cadastrar(@RequestBody Marca marca) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(marca));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marca> atualizar(@PathVariable int id, @RequestBody Marca marca) {
        marca.setId(id);
        return ResponseEntity.ok(service.atualizar(marca));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marca> buscarPorId(@PathVariable int id) {
        Optional<Marca> marca = service.buscarPorId(id);
        return marca.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

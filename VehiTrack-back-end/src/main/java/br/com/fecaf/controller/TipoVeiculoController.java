package br.com.fecaf.controller;

import br.com.fecaf.model.TipoVeiculo;
import br.com.fecaf.model.Usuario;
import br.com.fecaf.services.TipoVeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tipos-veiculo") // Padronizado com "/api"
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class TipoVeiculoController {

    @Autowired
    private TipoVeiculoService service;

    @GetMapping
    public List<TipoVeiculo> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<TipoVeiculo> cadastrar(@RequestBody TipoVeiculo tipo) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(service.cadastrar(tipo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoVeiculo> atualizar(@PathVariable int id, @RequestBody TipoVeiculo tipo) {
        tipo.setId(id);
        return ResponseEntity.ok(service.atualizar(tipo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoVeiculo> buscarPorId(@PathVariable int id) {
        Optional<TipoVeiculo> tipoVeiculo = service.buscarPorId(id);
        return tipoVeiculo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

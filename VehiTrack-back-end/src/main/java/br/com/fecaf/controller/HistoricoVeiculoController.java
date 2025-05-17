package br.com.fecaf.controller;

import br.com.fecaf.model.HistoricoVeiculo;
import br.com.fecaf.services.HistoricoVeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/historicos-veiculo") // Padronizado com "/api"
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class HistoricoVeiculoController {

    @Autowired
    private HistoricoVeiculoService service;

    @GetMapping
    public List<HistoricoVeiculo> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<HistoricoVeiculo> cadastrar(@RequestBody HistoricoVeiculo historico) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(historico));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<HistoricoVeiculo> atualizar(@PathVariable int id, @RequestBody HistoricoVeiculo historico) {
        historico.setId(id);
        return ResponseEntity.ok(service.atualizar(historico));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoricoVeiculo> buscarPorId(@PathVariable int id) {
        Optional<HistoricoVeiculo> historicoVeiculo = service.buscarPorId(id);
        return historicoVeiculo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

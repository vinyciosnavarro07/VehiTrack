package br.com.fecaf.controller;

import br.com.fecaf.model.Veiculo;
import br.com.fecaf.services.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos") // Padronizado com "/api"
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class VeiculoController {

    @Autowired
    private VeiculoService service;

    @GetMapping
    public List<Veiculo> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Veiculo> cadastrar(@RequestBody Veiculo veiculo) {
        Veiculo novoVeiculo = service.cadastrar(veiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable int id, @RequestBody Veiculo veiculo) {
        try {
            veiculo.setId(id);
            Veiculo veiculoAtualizado = service.atualizar(veiculo);
            return ResponseEntity.status(HttpStatus.OK).body(veiculoAtualizado);
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable int id) {
        return service.buscarPorId(id)
                .map(veiculo -> ResponseEntity.ok().body(veiculo))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}

package br.com.fecaf.services;

import br.com.fecaf.model.HistoricoVeiculo;
import br.com.fecaf.repository.HistoricoVeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistoricoVeiculoService {

    @Autowired
    private HistoricoVeiculoRepository repository;

    public List<HistoricoVeiculo> listar() {
        return repository.findAll();
    }

    public HistoricoVeiculo cadastrar(HistoricoVeiculo historico) {
        return repository.save(historico);
    }

    public void deletar(int id) {
        repository.deleteById(id);
    }

    public HistoricoVeiculo atualizar(HistoricoVeiculo historico) {
        return repository.save(historico);
    }

    public Optional<HistoricoVeiculo> buscarPorId(int id) {
        return repository.findById(id);
    }

}

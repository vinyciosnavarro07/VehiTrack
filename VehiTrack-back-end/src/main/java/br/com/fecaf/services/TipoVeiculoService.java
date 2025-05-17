package br.com.fecaf.services;

import br.com.fecaf.model.TipoVeiculo;
import br.com.fecaf.repository.TipoVeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoVeiculoService {

    @Autowired
    private TipoVeiculoRepository repository;

    public List<TipoVeiculo> listar() {
        return repository.findAll();
    }

    public TipoVeiculo cadastrar(TipoVeiculo tipo) {
        return repository.save(tipo);
    }

    public void deletar(int id) {
        repository.deleteById(id);
    }

    public TipoVeiculo atualizar(TipoVeiculo tipo) {
        return repository.save(tipo);
    }

    public Optional<TipoVeiculo> buscarPorId(int id) {
        return repository.findById(id);
    }

}

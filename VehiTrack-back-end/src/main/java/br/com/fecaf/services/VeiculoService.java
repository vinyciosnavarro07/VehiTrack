package br.com.fecaf.services;

import br.com.fecaf.model.Veiculo;
import br.com.fecaf.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository repository;

    public List<Veiculo> listar() {
        return repository.findAll();
    }

    public Veiculo cadastrar(Veiculo veiculo) {
        return repository.save(veiculo);
    }

    public void deletar(int id) {
        repository.deleteById(id);
    }

    public Veiculo atualizar(Veiculo veiculo) {
        if (!repository.existsById(veiculo.getId())) {
            throw new RuntimeException("Veículo não encontrado com o ID " + veiculo.getId());
        }
        return repository.save(veiculo);
    }

    public Optional<Veiculo> buscarPorId(int id) {
        return repository.findById(id);
    }

}

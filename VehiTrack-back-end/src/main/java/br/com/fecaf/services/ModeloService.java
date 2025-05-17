package br.com.fecaf.services;

import br.com.fecaf.model.Modelo;
import br.com.fecaf.repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModeloService {

    @Autowired
    private ModeloRepository repository;

    public List<Modelo> listar() {
        return repository.findAll();
    }

    public Modelo cadastrar(Modelo modelo) {
        return repository.save(modelo);
    }

    public void deletar(int id) {
        repository.deleteById(id);
    }

    public Modelo atualizar(Modelo modelo) {
        return repository.save(modelo);
    }

    public Optional<Modelo> buscarPorId(int id) {
        return repository.findById(id);
    }

}

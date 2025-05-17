package br.com.fecaf.services;

import br.com.fecaf.model.Marca;
import br.com.fecaf.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository repository;

    public List<Marca> listar() {
        return repository.findAll();
    }

    public Marca cadastrar(Marca marca) {
        return repository.save(marca);
    }

    public void deletar(int id) {
        repository.deleteById(id);
    }

    public Marca atualizar(Marca marca) {
        return repository.save(marca);
    }

    public Optional<Marca> buscarPorId(int id) {
        return repository.findById(id);
    }

}

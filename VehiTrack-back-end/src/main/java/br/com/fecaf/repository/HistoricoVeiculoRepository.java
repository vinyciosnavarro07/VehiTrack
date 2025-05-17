package br.com.fecaf.repository;

import br.com.fecaf.model.HistoricoVeiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoVeiculoRepository extends JpaRepository<HistoricoVeiculo, Integer> {
}

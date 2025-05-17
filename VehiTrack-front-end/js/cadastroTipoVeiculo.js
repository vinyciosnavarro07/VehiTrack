function exibirMensagem(texto, tipo = 'info') {
  const alertDiv = document.getElementById('customAlert');
  alertDiv.textContent = texto;
  alertDiv.className = `mostrar ${tipo}`;

  setTimeout(() => {
    alertDiv.classList.remove('mostrar');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = 'http://localhost:8080/api';
  const tipoVeiculoForm = document.getElementById('tipoVeiculoForm');
  const tipoVeiculosBody = document.getElementById('tipoVeiculosBody');

  let tipoVeiculoEditandoId = null;

  tipoVeiculoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const descricao = tipoVeiculoForm.descricao.value.trim();
    if (!descricao) return exibirMensagem('Preencha a descrição.', 'erro');

    const dados = { descricao };

    try {
      let res;
      if (tipoVeiculoEditandoId) {
        res = await fetch(`${API_BASE}/tipos-veiculo/${tipoVeiculoEditandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });

        if (!res.ok) throw new Error('Erro ao atualizar tipo de veículo');
        exibirMensagem('Tipo de veículo atualizado com sucesso!', 'sucesso');
      } else {
        res = await fetch(`${API_BASE}/tipos-veiculo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });

        if (!res.ok) throw new Error('Erro ao cadastrar tipo de veículo');
        exibirMensagem('Tipo de veículo cadastrado com sucesso!', 'sucesso');
      }

      tipoVeiculoForm.reset();
      tipoVeiculoForm.querySelector('button[type="submit"]').textContent = 'Cadastrar';
      const btnCancelar = document.getElementById('btnCancelar');
      if (btnCancelar) btnCancelar.style.display = 'none';
      tipoVeiculoEditandoId = null;
      listarTiposVeiculo();
    } catch (error) {
      exibirMensagem('Erro: ' + error.message, 'erro');
    }
  });

  async function listarTiposVeiculo() {
    try {
      const res = await fetch(`${API_BASE}/tipos-veiculo`);
      if (!res.ok) throw new Error('Erro ao listar tipos de veículo');

      const tipos = await res.json();
      tipoVeiculosBody.innerHTML = '';

      tipos.forEach(tipo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${tipo.id}</td>
          <td>${tipo.descricao}</td>
          <td>
            <button class="editar-btn" data-id="${tipo.id}">Editar</button>
            <button class="excluir-btn" data-id="${tipo.id}">Excluir</button>
          </td>
        `;
        tipoVeiculosBody.appendChild(tr);
      });

      document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', () => carregarTipoParaEdicao(btn.dataset.id));
      });

      document.querySelectorAll('.excluir-btn').forEach(btn => {
        btn.addEventListener('click', () => deletarTipo(btn.dataset.id));
      });

    } catch (err) {
      exibirMensagem(err.message, 'erro');
    }
  }

  async function carregarTipoParaEdicao(id) {
    try {
      const res = await fetch(`${API_BASE}/tipos-veiculo/${id}`);
      if (!res.ok) throw new Error('Erro ao buscar tipo de veículo');

      const tipo = await res.json();
      tipoVeiculoForm.descricao.value = tipo.descricao;
      tipoVeiculoEditandoId = tipo.id;
      tipoVeiculoForm.querySelector('button[type="submit"]').textContent = 'Atualizar';

      const btnCancelar = document.getElementById('btnCancelar');
      if (btnCancelar) btnCancelar.style.display = 'inline-block';
    } catch (error) {
      exibirMensagem('Erro: ' + error.message, 'erro');
    }
  }

  async function deletarTipo(id) {
    if (!confirm('Deseja realmente excluir este tipo de veículo?')) return;

    try {
      const res = await fetch(`${API_BASE}/tipos-veiculo/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Erro ao excluir tipo de veículo');

      exibirMensagem('Tipo de veículo excluído com sucesso!', 'sucesso');
      listarTiposVeiculo();
    } catch (error) {
      exibirMensagem('Erro: ' + error.message, 'erro');
    }
  }

  function cancelarEdicao() {
    tipoVeiculoEditandoId = null;
    tipoVeiculoForm.reset();
    tipoVeiculoForm.querySelector('button[type="submit"]').textContent = 'Cadastrar';
    const btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) btnCancelar.style.display = 'none';
  }

  const btnCancelar = document.getElementById('btnCancelar');
  if (btnCancelar) {
    btnCancelar.style.display = 'none';
    btnCancelar.addEventListener('click', cancelarEdicao);
  }

  listarTiposVeiculo();
});

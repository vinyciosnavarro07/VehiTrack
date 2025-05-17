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
  const modeloForm = document.getElementById('modeloForm');
  const marcaSelect = document.getElementById('marca');
  const tipoVeiculoSelect = document.getElementById('tipoVeiculo');
  const modelosBody = document.getElementById('modelosBody');

  let modeloEditandoId = null;

  async function carregarMarcas() {
    try {
      const res = await fetch(`${API_BASE}/marcas`);
      if (!res.ok) throw new Error('Erro ao carregar marcas');
      const marcas = await res.json();
      marcaSelect.innerHTML = '<option value="">Selecione a marca</option>';
      marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca.id;
        option.textContent = marca.nome;
        marcaSelect.appendChild(option);
      });
    } catch (err) {
      exibirMensagem(err.message, 'erro');
    }
  }

  async function carregarTiposVeiculos() {
    try {
      const res = await fetch(`${API_BASE}/tipos-veiculo`);
      if (!res.ok) throw new Error('Erro ao carregar tipos de veículos');
      const tipos = await res.json();
      tipoVeiculoSelect.innerHTML = '<option value="">Selecione o tipo</option>';
      tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id;
        option.textContent = tipo.descricao;
        tipoVeiculoSelect.appendChild(option);
      });
    } catch (err) {
      exibirMensagem(err.message, 'erro');
    }
  }

  modeloForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = modeloForm.nome.value.trim();
    const marcaId = marcaSelect.value;
    const tipoVeiculoId = tipoVeiculoSelect.value;

    if (!nome) return exibirMensagem('Preencha o nome do modelo.', 'erro');
    if (!marcaId) return exibirMensagem('Selecione uma marca.', 'erro');
    if (!tipoVeiculoId) return exibirMensagem('Selecione um tipo de veículo.', 'erro');

    const dados = {
      nome,
      marca: { id: parseInt(marcaId) },
      tipoVeiculo: { id: parseInt(tipoVeiculoId) }
    };

    try {
      let res;
      if (modeloEditandoId) {
        res = await fetch(`${API_BASE}/modelos/${modeloEditandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
        if (!res.ok) throw new Error('Erro ao atualizar modelo');
        exibirMensagem('Modelo atualizado com sucesso!', 'sucesso');
      } else {
        res = await fetch(`${API_BASE}/modelos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
        if (!res.ok) throw new Error('Erro ao cadastrar modelo');
        exibirMensagem('Modelo cadastrado com sucesso!', 'sucesso');
      }

      cancelarEdicao();
      listarModelos();
    } catch (error) {
      exibirMensagem('Erro: ' + error.message, 'erro');
    }
  });

  async function listarModelos() {
    try {
      const res = await fetch(`${API_BASE}/modelos`);
      if (!res.ok) throw new Error('Erro ao listar modelos');

      const modelos = await res.json();
      modelosBody.innerHTML = '';

      modelos.forEach(modelo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${modelo.id}</td>
          <td>${modelo.nome}</td>
          <td>${modelo.marca?.nome || '---'}</td>
          <td>${modelo.tipoVeiculo?.descricao || '---'}</td>
          <td>
            <button class="editar-btn" data-id="${modelo.id}">Editar</button>
            <button class="excluir-btn" data-id="${modelo.id}">Excluir</button>
          </td>
        `;
        modelosBody.appendChild(tr);
      });

      document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', () => carregarModeloParaEdicao(btn.dataset.id));
      });

      document.querySelectorAll('.excluir-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if(confirm('Deseja excluir este modelo?')) {
            deletarModelo(btn.dataset.id);
          }
        });
      });

    } catch (err) {
      exibirMensagem(err.message, 'erro');
    }
  }

  async function carregarModeloParaEdicao(id) {
    try {
      const res = await fetch(`${API_BASE}/modelos/${id}`);
      if (!res.ok) throw new Error('Erro ao buscar modelo');

      const modelo = await res.json();
      modeloForm.nome.value = modelo.nome;
      marcaSelect.value = modelo.marca?.id || '';
      tipoVeiculoSelect.value = modelo.tipoVeiculo?.id || '';
      modeloEditandoId = modelo.id;
      modeloForm.querySelector('button[type="submit"]').textContent = 'Atualizar';

      const btnCancelar = document.getElementById('btnCancelar');
      if (btnCancelar) btnCancelar.style.display = 'inline-block';

    } catch (error) {
      exibirMensagem('Erro: ' + error.message, 'erro');
    }
  }

  async function deletarModelo(id) {
    try {
      const res = await fetch(`${API_BASE}/modelos/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Erro ao excluir modelo');
      exibirMensagem('Modelo excluído com sucesso!', 'sucesso');
      listarModelos();
    } catch (error) {
      exibirMensagem('Erro: ' + error.message, 'erro');
    }
  }

  function cancelarEdicao() {
    modeloEditandoId = null;
    modeloForm.reset();
    modeloForm.querySelector('button[type="submit"]').textContent = 'Cadastrar';

    const btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) btnCancelar.style.display = 'none';
  }

  const btnCancelar = document.getElementById('btnCancelar');
  if (btnCancelar) {
    btnCancelar.style.display = 'none';
    btnCancelar.addEventListener('click', cancelarEdicao);
  }

  // Inicialização
  carregarMarcas();
  carregarTiposVeiculos();
  listarModelos();
});

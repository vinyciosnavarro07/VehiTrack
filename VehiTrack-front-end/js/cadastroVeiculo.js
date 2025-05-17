const API_BASE = 'http://localhost:8080/api';
let editandoId = null;

function mostrarMensagem(msg, cor = '#333') {
  const alertBox = document.getElementById('customAlert');
  alertBox.textContent = msg;
  alertBox.style.backgroundColor = cor;
  alertBox.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3000);
}

async function carregarModelos() {
  const modeloSelect = document.getElementById('modelo');
  modeloSelect.innerHTML = '<option value="">Selecione um modelo</option>';

  try {
    const res = await fetch(`${API_BASE}/modelos`);
    if (!res.ok) throw new Error('Erro ao carregar modelos');
    const modelos = await res.json();

    modelos.forEach(modelo => {
      const option = document.createElement('option');
      option.value = modelo.id;
      option.textContent = modelo.nome;
      modeloSelect.appendChild(option);
    });
  } catch (err) {
    mostrarMensagem(err.message, '#c0392b');
  }
}

async function listarVeiculos() {
  const veiculosBody = document.getElementById('veiculosBody');
  veiculosBody.innerHTML = '';

  try {
    const res = await fetch(`${API_BASE}/veiculos`);
    if (!res.ok) throw new Error('Erro ao carregar veículos');
    const veiculos = await res.json();

    veiculos.forEach(veiculo => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${veiculo.id}</td>
        <td>${veiculo.modelo?.nome || 'N/A'}</td>
        <td>${veiculo.anoFabricacao}</td>
        <td>${veiculo.cor}</td>
        <td>${veiculo.preco.toFixed(2)}</td>
        <td>${veiculo.quilometragem}</td>
        <td>${veiculo.statusDisponibilidade}</td>
        <td>
          <button class="btn-editar" data-id="${veiculo.id}">Editar</button>
          <button class="btn-deletar" data-id="${veiculo.id}">Excluir</button>
        </td>
      `;

      veiculosBody.appendChild(tr);
    });
  } catch (err) {
    mostrarMensagem(err.message, '#c0392b');
  }
}

async function salvarVeiculo(event) {
  event.preventDefault();

  const form = event.target;
  const modeloSelect = document.getElementById('modelo');
  const submitButton = form.querySelector('button[type="submit"]');
  const btnCancelar = document.getElementById('btnCancelar');

  const dados = {
    modelo: { id: parseInt(modeloSelect.value) },
    anoFabricacao: parseInt(form.ano.value),
    cor: form.cor.value.trim(),
    preco: parseFloat(form.preco.value),
    quilometragem: parseInt(form.quilometragem.value),
    statusDisponibilidade: form.status.value
  };

  const url = editandoId ? `${API_BASE}/veiculos/${editandoId}` : `${API_BASE}/veiculos`;
  const method = editandoId ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (!res.ok) throw new Error('Erro ao salvar veículo');

    mostrarMensagem(editandoId ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado com sucesso!', '#27ae60');
    form.reset();
    editandoId = null;
    submitButton.textContent = 'Cadastrar';
    btnCancelar.style.display = 'none';
    await listarVeiculos();
  } catch (err) {
    mostrarMensagem(err.message, '#c0392b');
  }
}

async function editarVeiculo(id) {
  try {
    const res = await fetch(`${API_BASE}/veiculos/${id}`);
    if (!res.ok) throw new Error('Erro ao buscar veículo');

    const veiculo = await res.json();
    editandoId = veiculo.id;

    const form = document.getElementById('veiculoForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const btnCancelar = document.getElementById('btnCancelar');

    document.getElementById('modelo').value = veiculo.modelo.id;
    form.ano.value = veiculo.anoFabricacao;
    form.cor.value = veiculo.cor;
    form.preco.value = veiculo.preco;
    form.quilometragem.value = veiculo.quilometragem;
    form.status.value = veiculo.statusDisponibilidade;

    submitButton.textContent = 'Atualizar';
    btnCancelar.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    mostrarMensagem(err.message, '#c0392b');
  }
}

async function deletarVeiculo(id) {
  if (!confirm('Tem certeza que deseja excluir este veículo?')) return;

  try {
    const res = await fetch(`${API_BASE}/veiculos/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao excluir veículo');
    mostrarMensagem('Veículo excluído com sucesso!', '#27ae60');
    await listarVeiculos();
  } catch (err) {
    mostrarMensagem(err.message, '#c0392b');
  }
}

function cancelarEdicao() {
  const form = document.getElementById('veiculoForm');
  const submitButton = form.querySelector('button[type="submit"]');
  const btnCancelar = document.getElementById('btnCancelar');

  editandoId = null;
  form.reset();
  submitButton.textContent = 'Cadastrar';
  btnCancelar.style.display = 'none';
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-editar')) {
    const id = e.target.dataset.id;
    editarVeiculo(id);
  }

  if (e.target.classList.contains('btn-deletar')) {
    const id = e.target.dataset.id;
    deletarVeiculo(id);
  }

  if (e.target.id === 'btnCancelar') {
    cancelarEdicao();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('veiculoForm').addEventListener('submit', salvarVeiculo);
  carregarModelos();
  listarVeiculos();

  const btnCancelar = document.getElementById('btnCancelar');
  if (btnCancelar) btnCancelar.style.display = 'none';
});

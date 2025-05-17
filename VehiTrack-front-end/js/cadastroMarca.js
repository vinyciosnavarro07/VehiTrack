document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = 'http://localhost:8080/api';
  const marcaForm = document.getElementById('marcaForm');
  const marcasBody = document.getElementById('marcasBody');
  const submitButton = marcaForm.querySelector('button[type="submit"]');
  const btnCancelar = document.getElementById('btnCancelar');

  let editandoId = null;

  function mostrarMensagem(mensagem) {
  const alerta = document.getElementById('customAlert');
  alerta.textContent = mensagem;
  alerta.classList.add('mostrar');

  setTimeout(() => {
    alerta.classList.remove('mostrar');
  }, 3000); // Tempo da animação + exibição
}


  // Cadastrar ou atualizar marca
  marcaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = marcaForm.nome.value.trim();
    if (!nome) return mostrarMensagem('Preencha o nome da marca.');

    const dados = { nome };

    try {
      const url = editandoId ? `${API_BASE}/marcas/${editandoId}` : `${API_BASE}/marcas`;
      const method = editandoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      if (!res.ok) throw new Error(editandoId ? 'Erro ao atualizar marca' : 'Erro ao cadastrar marca');

      mostrarMensagem(editandoId ? 'Marca atualizada com sucesso!' : 'Marca cadastrada com sucesso!');
      cancelarEdicao();
      listarMarcas();
    } catch (error) {
      mostrarMensagem('Erro: ' + error.message);
    }
  });

  // Listar marcas existentes
  async function listarMarcas() {
    try {
      const res = await fetch(`${API_BASE}/marcas`);
      if (!res.ok) throw new Error('Erro ao carregar marcas');

      const marcas = await res.json();

      marcasBody.innerHTML = '';
      marcas.forEach(marca => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${marca.id}</td>
          <td>${marca.nome}</td>
          <td>
            <button class="editar-btn" data-id="${marca.id}">Editar</button>
            <button class="excluir-btn" data-id="${marca.id}">Excluir</button>
          </td>
        `;
        marcasBody.appendChild(tr);
      });

      // Associar eventos para editar e excluir
      document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', () => editarMarca(btn.dataset.id));
      });

      document.querySelectorAll('.excluir-btn').forEach(btn => {
        btn.addEventListener('click', () => deletarMarca(btn.dataset.id));
      });

    } catch (err) {
      mostrarMensagem('Erro ao carregar marcas: ' + err.message);
    }
  }

  // Editar marca
  async function editarMarca(id) {
    try {
      const res = await fetch(`${API_BASE}/marcas/${id}`);
      if (!res.ok) throw new Error('Erro ao buscar marca');

      const marca = await res.json();
      marcaForm.nome.value = marca.nome;
      editandoId = marca.id;
      submitButton.textContent = 'Atualizar';
      if (btnCancelar) btnCancelar.style.display = 'inline-block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      mostrarMensagem('Erro: ' + err.message);
    }
  }

  // Deletar marca
  async function deletarMarca(id) {
    if (!confirm('Tem certeza que deseja excluir esta marca?')) return;

    try {
      const res = await fetch(`${API_BASE}/marcas/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Erro ao excluir marca');
      mostrarMensagem('Marca excluída com sucesso!');
      listarMarcas();
    } catch (err) {
      mostrarMensagem('Erro: ' + err.message);
    }
  }

  // Cancelar edição
  function cancelarEdicao() {
    editandoId = null;
    marcaForm.reset();
    submitButton.textContent = 'Cadastrar';
    if (btnCancelar) btnCancelar.style.display = 'none';
  }

  if (btnCancelar) {
    btnCancelar.style.display = 'none';
    btnCancelar.addEventListener('click', cancelarEdicao);
  }

  // Inicialização
  listarMarcas();

  // Tornar funções globais caso queira usar inline no HTML (opcional)
  window.editarMarca = editarMarca;
  window.deletarMarca = deletarMarca;
});

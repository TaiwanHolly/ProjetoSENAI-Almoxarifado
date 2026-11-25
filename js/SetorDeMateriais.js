async function cadastrarMaterial() {
  const dados = {
    nome: document.getElementById("nome").value,
    ca: document.getElementById("ca").value,
    tipo: document.getElementById("tipo").value,
    quantidade: document.getElementById("quantidade").value,
  };

  const resposta = await fetch("http://localhost:8080/api/cadastro/material", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (resposta.ok) {
    alert("Material cadastrado com sucesso");

    //Atualiza a tabela depois do cadastro.
    await listarMateriais();
  } else {
    alert("Erro ao cadastrar");
  }
}

function mostrarNome() {
  document.getElementById("MostrarNome").textContent =
    localStorage.getItem("nomeUsuario");
}

//Busca os materiais cadastrados no backend.
async function listarMateriais() {
  // Envia uma requisição GET para buscar os materiais.
  const resposta = await fetch("http://localhost:8080/api/cadastro/material");

  // Verifica se a resposta foi recebida corretamente.
  if (!resposta.ok) {
    alert("Erro ao carregar os materiais.");
    return;
  }

  // Transforma a resposta JSON em uma lista JavaScript.
  const materiais = await resposta.json();

  // Envia a lista para a função que monta a tabela.
  mostrarMateriais(materiais);
}

// NOVO: Mostra os materiais na tabela HTML.
function mostrarMateriais(materiais) {
  // Localiza o espaço da tabela pelo ID.
  const tabela = document.getElementById("tabelaDados");

  // Limpa as linhas antigas para evitar duplicações.
  tabela.innerHTML = "";

  // Percorre todos os materiais recebidos do banco.
  materiais.forEach(function (material) {
    // Cria uma nova linha para o material atual.
    const linha = document.createElement("tr");

    // Cria as células com os dados do material.
    const nome = document.createElement("td");
    nome.textContent = material.nome;

    const ca = document.createElement("td");
    ca.textContent = material.ca;

    const tipo = document.createElement("td");
    tipo.textContent = material.tipo;

    const quantidade = document.createElement("td");
    quantidade.textContent = material.quantidade;

    // NOVO: Cria a célula onde ficará o botão de exclusão.
    const acoes = document.createElement("td");

    // NOVO: Cria o botão Excluir.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    // Ao clicar, envia o ID do material para a função de exclusão.
    botaoExcluir.onclick = function () {
      excluirMaterial(material.id);
    };

    // Coloca o botão dentro da célula de ações.
    acoes.appendChild(botaoExcluir);

    // Adiciona todas as células à linha.
    linha.appendChild(nome);
    linha.appendChild(ca);
    linha.appendChild(tipo);
    linha.appendChild(quantidade);
    linha.appendChild(acoes);

    // Adiciona a linha completa à tabela.
    tabela.appendChild(linha);
  });
}

// NOVO: Exclui um material pelo ID.
async function excluirMaterial(id) {
  // Solicita confirmação antes de excluir o registro.
  const confirmar = confirm("Deseja realmente excluir este material?");

  // Se o usuário cancelar, não realiza a exclusão.
  if (!confirmar) {
    return;
  }

  // Envia uma requisição DELETE para o backend.
  const resposta = await fetch(
    `http://localhost:8080/api/cadastro/material/${id}`,
    {
      method: "DELETE",
    },
  );

  // Verifica se o material foi excluído corretamente.
  if (resposta.ok) {
    alert("Material excluído com sucesso!");

    // Atualiza a tabela depois da exclusão.
    await listarMateriais();
  } else {
    alert("Erro ao excluir o material.");
  }
}

// NOVO: Pesquisa materiais pelo nome digitado.
document.getElementById("pesquisa").addEventListener("input", function () {
  // Guarda o texto da pesquisa em letras minúsculas.
  const pesquisa = this.value.toLowerCase();

  // Seleciona todas as linhas da tabela.
  const linhas = document.querySelectorAll("#tabelaDados tr");

  // Verifica o nome de cada material.
  linhas.forEach(function (linha) {
    // O nome está na primeira célula da linha.
    const nomeMaterial = linha.cells[0].textContent.toLowerCase();

    // Mostra apenas os materiais que correspondem à pesquisa.
    linha.style.display = nomeMaterial.includes(pesquisa) ? "" : "none";
  });
});

// NOVO: Carrega os materiais quando a página terminar de abrir.
document.addEventListener("DOMContentLoaded", function () {
  // Busca os registros salvos e preenche a tabela.
  listarMateriais();
});

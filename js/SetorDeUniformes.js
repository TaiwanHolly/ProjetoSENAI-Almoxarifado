async function cadastrarUniforme() {
  const dados = {
    nome: document.getElementById("nome").value,
    ca: document.getElementById("ca").value,
    tamanho: document.getElementById("tamanho").value,
    quantidade: document.getElementById("quantidade").value,
  };

  const resposta = await fetch("http://localhost:8080/api/cadastro/uniforme", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (resposta.ok) {
    alert("Uniforme cadastrado com sucesso");

    document.getElementById("formCadastro").reset();
    listarUniforme();

  } else {
    alert("Erro ao cadastrar");
  }
}

function mostrarNome() {
  document.getElementById("MostrarNome").textContent =
    localStorage.getItem("nomeUsuario");
}

// NOVO: Busca os uniformes cadastrados no backend.
async function listarUniforme() {

  // Envia uma requisição GET para buscar os uniformes.
  const resposta = await fetch("http://localhost:8080/api/cadastro/uniforme");

  // Verifica se a resposta foi recebida corretamente.
  if (!resposta.ok) {
    alert("Erro ao carregar os uniformes.");
    return;
  }

  // Converte a resposta JSON em uma lista JavaScript.
  const uniformes = await resposta.json();

  // Envia os dados para a função que monta a tabela.
  mostrarUniformes(uniformes);
}


// NOVO: Mostra os uniformes recebidos dentro da tabela HTML.
function mostrarUniformes(uniformes) {

  // Localiza o tbody da tabela pelo seu ID.
  const tabela = document.getElementById("tabelaDados");

  // Limpa as linhas antigas para evitar duplicações.
  tabela.innerHTML = "";

  // Percorre todos os uniformes recebidos do banco.
  uniformes.forEach(function (uniforme) {

    // Cria uma nova linha para o uniforme atual.
    const linha = document.createElement("tr");

    // Cria as células com as informações do uniforme.
    const nome = document.createElement("td");
    nome.textContent = uniforme.nome;

    const ca = document.createElement("td");
    ca.textContent = uniforme.ca;

    const tamanho = document.createElement("td");
    tamanho.textContent = uniforme.tamanho;

    const quantidade = document.createElement("td");
    quantidade.textContent = uniforme.quantidade;

    // NOVO: Cria a célula que receberá o botão de exclusão.
    const acoes = document.createElement("td");

    // NOVO: Cria o botão Excluir.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    // Ao clicar, chama a função de exclusão usando o ID do uniforme.
    botaoExcluir.onclick = function () {
      excluirUniforme(uniforme.id);
    };

    // Adiciona o botão dentro da célula de ações.
    acoes.appendChild(botaoExcluir);

    // Adiciona todas as células à linha.
    linha.appendChild(nome);
    linha.appendChild(ca);
    linha.appendChild(tamanho);
    linha.appendChild(quantidade);
    linha.appendChild(acoes);

    // Adiciona a linha completa à tabela.
    tabela.appendChild(linha);
  });
}


// NOVO: Exclui um uniforme pelo ID.
async function excluirUniforme(id) {

  // Pergunta ao usuário se deseja realmente excluir.
  const confirmar = confirm("Deseja realmente excluir este uniforme?");

  // Se o usuário cancelar, a função termina.
  if (!confirmar) {
    return;
  }

  // Envia uma requisição DELETE para o backend.
  const resposta = await fetch(
    `http://localhost:8080/api/cadastro/uniforme/${id}`,
    {
      method: "DELETE"
    }
  );

  // Verifica se a exclusão foi realizada corretamente.
  if (resposta.ok) {

    alert("Uniforme excluído com sucesso!");

    // Atualiza a tabela depois da exclusão.
    await listarUniforme();

  } else {
    alert("Erro ao excluir o uniforme.");
  }
}


// NOVO: Permite pesquisar uniformes pelo nome.
document.getElementById("pesquisa").addEventListener("input", function () {

  // Guarda o texto digitado em letras minúsculas.
  const pesquisa = this.value.toLowerCase();

  // Seleciona todas as linhas presentes na tabela.
  const linhas = document.querySelectorAll("#tabelaDados tr");

  // Percorre as linhas para verificar quais correspondem à pesquisa.
  linhas.forEach(function (linha) {

    // O nome do uniforme está na primeira célula.
    const nomeUniforme = linha.cells[0].textContent.toLowerCase();

    // Mostra ou esconde a linha conforme o resultado da pesquisa.
    linha.style.display = nomeUniforme.includes(pesquisa) ? "" : "none";
  });
});


// NOVO: Carrega os uniformes automaticamente ao abrir a página.
document.addEventListener("DOMContentLoaded", function () {

  // Busca os registros salvos e preenche a tabela.
  listarUniforme();
});
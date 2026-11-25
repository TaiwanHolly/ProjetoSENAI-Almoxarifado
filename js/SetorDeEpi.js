async function cadastrarEPI() {
  const dados = {
    nome: document.getElementById("nome").value,
    ca: document.getElementById("ca").value,
    variacao: document.getElementById("variacao").value,
    quantidade: document.getElementById("quantidade").value,
    calcado: document.getElementById("calcado").value
  };

  const resposta = await fetch("http://localhost:8080/api/cadastro/epi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (resposta.ok) {
    alert("EPI cadastrado com sucesso");
    //Atualiza a tabela após cadastrar um EPI.
    await listarEpis();

  } else {
    alert("Erro ao cadastrar");
  }
}


// NOVO: Função responsável por buscar os EPIs no backend.
async function listarEpis() {

  // Faz uma requisição GET para buscar os registros do banco.
  const resposta = await fetch("http://localhost:8080/api/cadastro/epi");

  // Verifica se a busca foi realizada corretamente.
  if (!resposta.ok) {
    alert("Erro ao carregar os EPIs.");
    return;
  }

  // Converte a resposta do backend para uma lista JavaScript.
  const epis = await resposta.json();

  // Envia a lista recebida para a função que monta a tabela.
  mostrarEpis(epis);
}


// NOVO: Função que mostra os EPIs recebidos dentro da tabela HTML.
function mostrarEpis(epis) {

  // Localiza o tbody da tabela pelo seu ID.
  const tabela = document.getElementById("tabelaDados");

  // Limpa as linhas antigas para evitar duplicações.
  tabela.innerHTML = "";

  // Percorre cada EPI recebido do banco de dados.
  epis.forEach(function (epi) {

    // Cria uma nova linha para o EPI atual.
    const linha = document.createElement("tr");

    // Cria uma célula para cada informação do EPI.
    const nome = document.createElement("td");
    nome.textContent = epi.nome;

    const ca = document.createElement("td");
    ca.textContent = epi.ca;

    const variacao = document.createElement("td");
    variacao.textContent = epi.variacao;

    const quantidade = document.createElement("td");
    quantidade.textContent = epi.quantidade;

    const calcado = document.createElement("td");
    calcado.textContent = epi.calcado;

    // NOVO: Cria a célula que receberá o botão de exclusão.
    const acoes = document.createElement("td");

    // NOVO: Cria o botão Excluir.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    // NOVO: Ao clicar, chama a função de exclusão
    // passando o ID do EPI que pertence a esta linha.
    botaoExcluir.onclick = function () {
      excluirEpi(epi.id);
    };

    // Adiciona o botão dentro da célula de ações.
    acoes.appendChild(botaoExcluir);

    // Adiciona todas as células na linha da tabela.
    linha.appendChild(nome);
    linha.appendChild(ca);
    linha.appendChild(variacao);
    linha.appendChild(quantidade);
    linha.appendChild(calcado);
    linha.appendChild(acoes);

    // Adiciona a linha completa dentro do tbody.
    tabela.appendChild(linha);
  });
}


// NOVO: Função responsável por excluir um EPI pelo ID.
async function excluirEpi(id) {

  // Pergunta ao usuário se ele realmente deseja excluir.
  const confirmar = confirm("Deseja realmente excluir este EPI?");

  // Se o usuário cancelar, a função termina sem excluir.
  if (!confirmar) {
    return;
  }

  // Envia uma requisição DELETE para o backend.
  const resposta = await fetch(
    `http://localhost:8080/api/cadastro/epi/${id}`,
    {
      method: "DELETE"
    }
  );

  // Verifica se a exclusão foi realizada.
  if (resposta.ok) {

    alert("EPI excluído com sucesso!");

    // Atualiza a tabela para remover o EPI excluído da tela.
    await listarEpis();

  } else {
    alert("Erro ao excluir o EPI.");
  }
}


// NOVO: Permite pesquisar EPIs pelo nome.
document.getElementById("pesquisa").addEventListener("input", function () {

  // Guarda o texto digitado, convertendo para letras minúsculas.
  const pesquisa = this.value.toLowerCase();

  // Seleciona todas as linhas atualmente presentes na tabela.
  const linhas = document.querySelectorAll("#tabelaDados tr");

  // Percorre as linhas para verificar quais correspondem à pesquisa.
  linhas.forEach(function (linha) {

    // Obtém o nome do EPI na primeira célula da linha.
    const nomeEpi = linha.cells[0].textContent.toLowerCase();

    // Mostra a linha se o nome corresponder à pesquisa.
    // Caso contrário, esconde a linha.
    linha.style.display = nomeEpi.includes(pesquisa) ? "" : "none";
  });
});


// NOVO: Carrega os EPIs automaticamente quando a página abrir.
document.addEventListener("DOMContentLoaded", function () {

  // Busca os registros salvos no banco e preenche a tabela.
  listarEpis();
});

// função principal. cadastra um novo material na tabela selecionada XD
function cadastrarMaterial() {

  //pega valor
  let tipoAlmoxarifado = document.getElementById("almoxarifado").value;
  let nome = document.getElementById("nomeMaterial").value;
  let detalhe = document.getElementById("detalheMaterial").value;
  let quantidade = document.getElementById("quantidadeMaterial").value;

  //validação para não deixar os campos vazios
  if (nome == "") {
    alert("Por favor, preencha o nome do material ou equipamento.");
    return; //Interrompe
  }

  if (quantidade == "" || quantidade <= 0) {
    alert("Por favor, informe uma quantidade válida maior que zero.");
    return; //Interrompe
  }

  //se o usuario não deixar detalhes, o código automaticamente vai Designar ele à o texto descrito
  if (detalhe == "") {
    detalhe = "Sem especificações";
  }

  //Armazena a tabela que vai ser utilizada
  let tabelaAlvo;

  //Minha estrutura maligna pra identificar qual tabela vai ser atualizada
  if (tipoAlmoxarifado == "epi") {
    tabelaAlvo = document.getElementById("tabelaEpi");
  } else if (tipoAlmoxarifado == "uniforme") {
    tabelaAlvo = document.getElementById("tabelaUniforme");
  } else if (tipoAlmoxarifado == "escolar") {
    tabelaAlvo = document.getElementById("tabelaEscolar");
  }

  //Localiza o corpo da tabela (tbody) para inserir a nova linha
  let corpoTabela = tabelaAlvo.getElementsByTagName("tbody")[0];

  //Cria a nova linha
  let novaLinha = corpoTabela.insertRow();

  //cria as células da nova linha
  let celulaNome = novaLinha.insertCell(0);
  let celulaDetalhes = novaLinha.insertCell(1);
  let celulaQuantidade = novaLinha.insertCell(2);
  let celulaAcoes = novaLinha.insertCell(3);

  //Insere os textos coletados nas células correspondentes
  celulaNome.innerText = nome;
  celulaDetalhes.innerText = detalhe;
  celulaQuantidade.innerText = quantidade;

  //Coloca o botão de excluir
  // O botão tem 'this' para identificar qual linha vai ser removida
  celulaAcoes.innerHTML = '<button type="button" class="btn-excluir" onclick="excluirMaterial(this)">Excluir</button>';

  alert("Material cadastrado com sucesso!");
  limparFormulario();
}

//Tira a linha do material cadastrado após confirmação
function excluirMaterial(botaoClicado) {

  //pergunta de confirmação antes de apagar o item
  let confirmacao = confirm("Tem certeza que deseja excluir este item do estoque?");

  if (confirmacao == true) {
    // Localiza a célula
    let celula = botaoClicado.parentNode;

    // Localiza a linha
    let linha = celula.parentNode;

    //Remove
    linha.remove();

    alert("Material removido do estoque com sucesso!");
  }
}

//limpa todos os campos
function limparFormulario() {
  document.getElementById("nomeMaterial").value = "";
  document.getElementById("detalheMaterial").value = "";
  document.getElementById("quantidadeMaterial").value = "";

  //retorna a seleção do select para o primeiro item (epi)
  document.getElementById("almoxarifado").selectedIndex = 0;
}

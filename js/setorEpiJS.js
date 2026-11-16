// Local onde os dados serão armazenados
let listaEPIs = JSON.parse(localStorage.getItem("listaEPIs")) || [];

// pega o form e a tabela
let formulario = document.getElementById("formCadastro");
let tabela = document.getElementById("tabelaDados");

// Salvar os dados duh
function salvarDados() {
    localStorage.setItem("listaEPIs", JSON.stringify(listaEPIs));
}

// Mostrar os EPIs na tabela
function mostrarEPIs() {
    tabela.innerHTML = "";

    listaEPIs.forEach((epi, indice) => {
        let linha = tabela.insertRow();

        linha.insertCell().innerText = epi.nome;
        linha.insertCell().innerText = epi.ca;
        linha.insertCell().innerText = epi.variacao;
        linha.insertCell().innerText = epi.quantidade;
        linha.insertCell().innerText = epi.descricao;

        // Coluna de exclusão
        let botaoExcluir = document.createElement("button");

        botaoExcluir.innerText = "Excluir";
        botaoExcluir.type = "button";

        botaoExcluir.onclick = function () {
            excluirEPI(indice);
        };

        linha.insertCell().appendChild(botaoExcluir);
    });
}

// Cadastrar EPI
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let ca = document.getElementById("ca").value;
    let variacao = document.getElementById("variacao").value;
    let quantidade = document.getElementById("quantidade").value;
    let descricao = document.getElementById("descricao").value;

    let novoEPI = {
        nome: nome,
        ca: ca,
        variacao: variacao,
        quantidade: quantidade,
        descricao: descricao
    };

    listaEPIs.push(novoEPI);

    salvarDados();
    mostrarEPIs();

    // Limpar formulário
    formulario.reset();
});

// Excluir EPI
function excluirEPI(indice) {
    listaEPIs.splice(indice, 1);

    salvarDados();
    mostrarEPIs();
}

// Mostrar os dados salvos ao abrir a página
mostrarEPIs();

//Verifica se já existem EPIs salvos no navegador.
//O localStorage.getItem busca os dados salvos com o nome "listaEPIs".
//O JSON.parse transforma os dados em uma lista que o JavaScript consegue utilizar.
//Caso não existam dados salvos, começa com uma lista vazia [].

let listaEPIs = JSON.parse(localStorage.getItem("listaEPIs")) || [];

//Localiza o formulário
let formulario = document.getElementById("formCadastro");

//Localiza a tabela
let tabela = document.getElementById("tabelaDados");


function salvarDados() {

    //Transforma a lista de EPIs em texto JSON.
    //Depois, salva esse texto no localStorage do navegador.

    localStorage.setItem("listaEPIs", JSON.stringify(listaEPIs));
}


function mostrarEPIs() {

    //Limpa a tabela antes de adicionar os registros novamente.
    //Isso evita que os mesmos EPIs apareçam duplicados na tela.

    tabela.innerHTML = "";

    //Percorre todos os EPIs que estão armazenados na lista.
    //O epi representa o cadastro atual.
    //O indice representa a posição desse cadastro dentro da lista.

    listaEPIs.forEach((epi, indice) => {

        //Cria uma nova linha na tabela para o EPI atual.
        let linha = tabela.insertRow();

        //Cria as colunas e coloca os dados do EPI em cada uma.
        linha.insertCell().innerText = epi.nome;
        linha.insertCell().innerText = epi.ca;
        linha.insertCell().innerText = epi.variacao;
        linha.insertCell().innerText = epi.quantidade;
        linha.insertCell().innerText = epi.calcado;

        //Cria um botão para excluir o EPI da tabela.
        let botaoExcluir = document.createElement("button");

        //Define o texto que aparecerá dentro do botão.
        botaoExcluir.innerText = "Excluir";

        //Impede que o botão tente enviar algum formulário.
        botaoExcluir.type = "button";

        //Quando o botão for clicado, chama a função excluirEPI.
        //O indice informa qual EPI deverá ser excluído.

        botaoExcluir.onclick = function () {
            excluirEPI(indice);
        };

        //Cria a última coluna da linha e coloca o botão dentro dela.
        linha.insertCell().appendChild(botaoExcluir);

    });
}


//Detecta quando o usuário envia o formulário.
formulario.addEventListener("submit", function(event) {

    //Impede que a página seja atualizada automaticamente.
    event.preventDefault();


    //O .value pega o conteúdo que foi digitado em cada campo.

    let nome = document.getElementById("nome").value;
    let ca = document.getElementById("ca").value;
    let variacao = document.getElementById("variacao").value;
    let quantidade = document.getElementById("quantidade").value;
    let calcado = document.getElementById("calcado").value;

    //Cria um objeto contendo todas as informações do novo EPI.
    //Cada informação é armazenada com um nome para facilitar sua utilização.

    let novoEPI = {
        nome: nome,
        ca: ca,
        variacao: variacao,
        quantidade: quantidade,
        calcado: calcado
    };

    //Adiciona o novo cadastro ao final da lista de EPIs.
    //O novo cadastro não apaga os anteriores.
    listaEPIs.push(novoEPI);


    //Salva a lista atualizada no navegador.
    salvarDados();

    //Atualiza a tabela para mostrar o novo EPI na tela.
    mostrarEPIs();

    //Apaga os valores digitados para permitir um novo cadastro.
    formulario.reset();

});


function excluirEPI(indice) {

    // Remove um EPI da lista utilizando sua posição.
    // O indice indica exatamente qual cadastro será removido.
    // O número 1 indica que apenas um registro será excluído.
    listaEPIs.splice(indice, 1);

    // Salva a lista sem o EPI excluído.
    salvarDados();

    // Atualiza a tabela para mostrar os registros restantes.
    mostrarEPIs();

}

// Executa a função mostrarEPIs assim que o JavaScript é carregado.
// Dessa forma, os cadastros anteriores aparecem novamente na tabela.
mostrarEPIs();
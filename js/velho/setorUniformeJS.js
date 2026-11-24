//Verifica se já existem Uniformes salvos no navegador.
//O localStorage.getItem busca os dados salvos com o nome "listaUniformes".
//O JSON.parse transforma os dados em uma lista que o JavaScript consegue utilizar.
//Caso não existam dados salvos, começa com uma lista vazia [].

let listaUniformes = JSON.parse(localStorage.getItem("listaUniformes")) || [];

//Localiza o formulário
let formulario = document.getElementById("formCadastro");

//Localiza a tabela
let tabela = document.getElementById("tabelaDados");


function salvarDados() {

    //Transforma a lista de Uniformes em texto JSON.
    //Depois, salva esse texto no localStorage do navegador.

    localStorage.setItem("listaUniformes", JSON.stringify(listaUniformes));
}


function mostrarUniformes() {

    //Limpa a tabela antes de adicionar os registros novamente.
    //Isso evita que os mesmos Uniformes apareçam duplicados na tela.

    tabela.innerHTML = "";

    //Percorre todos os Uniformes que estão armazenados na lista.
    //O Uniforme representa o cadastro atual.
    //O indice representa a posição desse cadastro dentro da lista.

    listaUniformes.forEach((uniforme, indice) => {

        //Cria uma nova linha na tabela para o Uniforme atual.
        let linha = tabela.insertRow();

        //Cria as colunas e coloca os dados do Uniforme em cada uma.
        linha.insertCell().innerText = uniforme.nome;
        linha.insertCell().innerText = uniforme.ca;
        linha.insertCell().innerText = uniforme.variacao;
        linha.insertCell().innerText = uniforme.quantidade;
        linha.insertCell().innerText = uniforme.descricao;

        //Cria um botão para excluir o Uniforme da tabela.
        let botaoExcluir = document.createElement("button");

        //Define o texto que aparecerá dentro do botão.
        botaoExcluir.innerText = "Excluir";

        //Impede que o botão tente enviar algum formulário.
        botaoExcluir.type = "button";

        //Quando o botão for clicado, chama a função excluirUniforme.
        //O indice informa qual Uniforme deverá ser excluído.

        botaoExcluir.onclick = function () {
            excluirUniforme(indice);
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
    let descricao = document.getElementById("descricao").value;

    //Cria um objeto contendo todas as informações do novo Uniforme.
    //Cada informação é armazenada com um nome para facilitar sua utilização.

    let novoUniforme = {
        nome: nome,
        ca: ca,
        variacao: variacao,
        quantidade: quantidade,
        descricao: descricao
    };

    //Adiciona o novo cadastro ao final da lista de Uniformes.
    //O novo cadastro não apaga os anteriores.
    listaUniformes.push(novoUniforme);


    //Salva a lista atualizada no navegador.
    salvarDados();

    //Atualiza a tabela para mostrar o novo Uniforme na tela.
    mostrarUniformes();

    //Apaga os valores digitados para permitir um novo cadastro.
    formulario.reset();

});


function excluirUniforme(indice) { 

    // Remove um Uniforme da lista utilizando sua posição.
    // O indice indica exatamente qual cadastro será removido.
    // O número 1 indica que apenas um registro será excluído.
    listaUniformes.splice(indice, 1);

    // Salva a lista sem o Uniforme excluído.
    salvarDados();

    // Atualiza a tabela para mostrar os registros restantes.
    mostrarUniformes();

}

// Executa a função mostrarUniformes assim que o JavaScript é carregado.
// Dessa forma, os cadastros anteriores aparecem novamente na tabela.
mostrarUniformes();
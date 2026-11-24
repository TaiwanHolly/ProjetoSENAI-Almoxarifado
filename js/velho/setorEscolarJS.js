//Verifica se já existem Materiais salvos no navegador.
//O localStorage.getItem busca os dados salvos com o nome "listaMateriais".
//O JSON.parse transforma os dados em uma lista que o JavaScript consegue utilizar.
//Caso não existam dados salvos, começa com uma lista vazia [].

let listaMateriais = JSON.parse(localStorage.getItem("listaMateriais")) || [];

//Localiza o formulário
let formulario = document.getElementById("formCadastro");

//Localiza a tabela
let tabela = document.getElementById("tabelaDados");


function salvarDados() {

    //Transforma a lista de Materiais em texto JSON.
    //Depois, salva esse texto no localStorage do navegador.

    localStorage.setItem("listaMateriais", JSON.stringify(listaMateriais));
}


function mostrarMateriais() {

    //Limpa a tabela antes de adicionar os registros novamente.
    //Isso evita que os mesmos Materiais apareçam duplicados na tela.

    tabela.innerHTML = "";

    //Percorre todos os Materiais que estão armazenados na lista.
    //O Materiai representa o cadastro atual.
    //O indice representa a posição desse cadastro dentro da lista.

    listaMateriais.forEach((material, indice) => {

        //Cria uma nova linha na tabela para o Materiai atual.
        let linha = tabela.insertRow();

        //Cria as colunas e coloca os dados do Materiai em cada uma.
        linha.insertCell().innerText = material.nome;
        linha.insertCell().innerText = material.ca;
        linha.insertCell().innerText = material.variacao;
        linha.insertCell().innerText = material.quantidade;
        linha.insertCell().innerText = material.descricao;

        //Cria um botão para excluir o material da tabela.
        let botaoExcluir = document.createElement("button");

        //Define o texto que aparecerá dentro do botão.
        botaoExcluir.innerText = "Excluir";

        //Impede que o botão tente enviar algum formulário.
        botaoExcluir.type = "button";

        //Quando o botão for clicado, chama a função excluirMaterial.
        //O indice informa qual Material deverá ser excluído.

        botaoExcluir.onclick = function () {
            excluirMaterial(indice);
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

    //Cria um objeto contendo todas as informações do novo Material.
    //Cada informação é armazenada com um nome para facilitar sua utilização.

    let novoMaterial = {
        nome: nome,
        ca: ca,
        variacao: variacao,
        quantidade: quantidade,
        descricao: descricao
    };

    //Adiciona o novo cadastro ao final da lista de s.
    //O novo cadastro não apaga os anteriores.
    listaMateriais.push(novoMaterial);


    //Salva a lista atualizada no navegador.
    salvarDados();

    //Atualiza a tabela para mostrar o novo Material na tela.
    mostrarMateriais();

    //Apaga os valores digitados para permitir um novo cadastro.
    formulario.reset();

});


function excluirMaterial(indice) {

    // Remove um Material da lista utilizando sua posição.
    // O indice indica exatamente qual cadastro será removido.
    // O número 1 indica que apenas um registro será excluído.
    listaMateriais.splice(indice, 1);

    // Salva a lista sem o Material excluído.
    salvarDados();

    // Atualiza a tabela para mostrar os registros restantes.
    mostrarMateriais();

}

// Executa a função mostrarMateriais assim que o JavaScript é carregado.
// Dessa forma, os cadastros anteriores aparecem novamente na tabela.
mostrarMateriais();
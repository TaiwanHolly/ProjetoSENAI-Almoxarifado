function cadastro() {
	//pega valores
	let nome = document.getElementById('nome');
    let ca = document.getElementById('ca')
    let variacao = document.getElementById('variacao')
	let quantidade = document.getElementById('quantidade');
    let descricao = document.getElementById('descricao')

	//localizar a tabela
	let tabela = document.getElementById('lista');
	let linha = tabela.insertRow();
	let coluna1 = linha.insertCell();
	let coluna2 = linha.insertCell();
	//mostra dados
	coluna1.innerText = nome;
	coluna2.innerText = quantidade;
	//mensagem concluida
	//document.getElementById('mensagem').innerText = "material cadastrado."
	alert("Cadastrado com sucesso.")
	//limpa form
	document.getElementById("nome").value = "";
	document.getElementById("quantidade").value = "";

}
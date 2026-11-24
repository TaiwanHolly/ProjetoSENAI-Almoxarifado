async function cadastrarUniforme() {
  const dados = {
    nome: document.getElementById("nome").value,
    ca: document.getElementById("ca").value,
    tamanho: document.getElementById("tamanho").value,
    quantidade: document.getElementById("quantidade").value
  };

  const resposta = await fetch("http://localhost:8080/api/cadastro/uniforme", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (resposta.ok) {
    alert("Uniforme cadastrado com sucesso");
  } else {
    alert("Erro ao cadastrar");
  }
}

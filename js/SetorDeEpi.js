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
  } else {
    alert("Erro ao cadastrar");
  }
}

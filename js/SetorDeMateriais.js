async function cadastrarMaterial() {
  const dados = {
    nome: document.getElementById("nome").value,
    ca: document.getElementById("ca").value,
    tipo: document.getElementById("tipo").value,
    quantidade: document.getElementById("quantidade").value
  };

  const resposta = await fetch("http://localhost:8080/api/cadastro/material", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (resposta.ok) {
    alert("Material cadastrado com sucesso");
  } else {
    alert("Erro ao cadastrar");
  }
}

function mostrarNome() {
  document.getElementById("MostrarNome").textContent =
    localStorage.getItem("nomeUsuario");
}
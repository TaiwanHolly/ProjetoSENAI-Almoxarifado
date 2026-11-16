async function cadastrar() {
  const dados = {
    nome: document.getElementById("nome-usuario").value,
    usuario: document.getElementById("usuario").value,
    senha: document.getElementById("senha").value,
    tipoUsuario: parseInt(document.getElementById("tipo").value)
  };
}

function pageswap() {
  window.location.href = "indexLogin.html";
}

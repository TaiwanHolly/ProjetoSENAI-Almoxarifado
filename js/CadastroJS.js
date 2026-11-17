if (!localStorage.getItem("meuToken")) {
  alert("Usúario não atenticado.");
  window.location.href = "indexLogin.html";
}else if (localStorage.getItem("TipoUsuario") != "admin") {
  alert("Você não tem permissão para acessar este modo.");
  window.location.href = "indexLogin.html";
}

async function cadastrar() {
  const dados = {
    nome: document.getElementById("nome-usuario").value,
    usuario: document.getElementById("usuario").value,
    senha: document.getElementById("senha").value,
    tipoUsuario: parseInt(document.getElementById("tipo").value),
  };
}

function pageswap() {
  window.location.href = "indexLogin.html";
}

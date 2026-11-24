function acessarEPI() {
  window.location.href = "setoresHTML/setorEPI.html";
}

function acessarEscolares() {
  window.location.href = "setoresHTML/setorESCOLAR.html";
}

function acessarUniformes() {
  window.location.href = "setoresHTML/setorUNIFORME.html";
}

if (localStorage.getItem("TipoUsuario") != "admin") {
  const link = document.getElementById("Cadastro-Card");
  link.style.display = "none";
}

function acessarCadastro() {
  if (localStorage.getItem("TipoUsuario") != "admin") {
    alert("🔒Você não possui acesso a esta área");
  } else {
    window.location.href = "indexCadastro.html";
  }
}

function mostrarNome() {
  document.getElementById("MostrarNome").textContent =
    localStorage.getItem("nomeUsuario");
}

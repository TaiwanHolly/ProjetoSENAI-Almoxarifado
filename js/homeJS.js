const prof = document.getElementById("cardsProf")
cardsProf.style.display = "none";

function acessarEPI() {
  window.location.href = "setoresHTML/setorEPI.html";
}

function acessarEscolares() {
  window.location.href = "setoresHTML/setorESCOLAR.html";
}

function acessarUniformes() {
  window.location.href = "setoresHTML/setorUNIFORME.html";
}

function acessarSolicitações() {
  window.location.href = "solicitações.html";
}


function acessarCadastro() {
  if (localStorage.getItem("TipoUsuario") != "admin") {
    alert("🔒Você não possui acesso a esta área");
  } else {
    window.location.href = "indexCadastro.html";
  }
}


if (localStorage.getItem("TipoUsuario") != "admin") {
  const link = document.getElementById("Cadastro-Card");
  link.style.display = "none";
}

if (localStorage.getItem("TipoUsuario") == "professor") {
  const link = document.getElementById("cards")
  link.style.display = "none";
  prof.style.display = "flex"
}

function mostrarNome() {
  document.getElementById("MostrarNome").textContent =
    localStorage.getItem("nomeUsuario");
}

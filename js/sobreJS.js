function mostrarNome() {
  document.getElementById("mostrarNome").textContent =
    localStorage.getItem("nomeUsuario");
}
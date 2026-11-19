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
    tipoUsuarioId: parseInt(document.getElementById("tipo").value),
  };

  const resposta = await fetch("http://localhost:8080/api/cadastro", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(dados)
  })

  if(resposta.ok){
    alert("Usuário cadastrado com sucesso.")
  }else{
    alert("Erro ao cadastrar, tente novamente mais tarde.")
  }

}

function pageswap() {
  window.location.href = "home.html";
}

async function logar() {
  //pegar os valores dos campos de login
  const usuario = document.getElementById("ipt-usuario").value;
  const senha = document.getElementById("ipt-senha").value;

  //enviar os valores para o backend (server)
  const resposta = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: usuario, senha: senha }),
  });
  //verificar se o login foi bem sucedido
  if (resposta.ok) {
    const dados = await resposta.json();
    localStorage.setItem("meuToken", "autenticado");
    localStorage.setItem("nomeUsuario", dados.nome);
    window.location.href = "home.html";
  } else {
    console.log("Erro ao logar");
  }
}

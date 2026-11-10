async function logar() {
  const usuario = document.getElementById("ipt-usuario").value;
  const senha = document.getElementById("ipt-senha").value;

  const resposta = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: usuario, senha: senha }),
  });
  if (resposta.ok) {
    const dados = await resposta.json();
    localStorage.setItem("meuToken", dados.token);
    localStorage.setItem("nomeUsuario", dados.nome);
    window.location.href = "home.html";
  } else {
    console.log("Erro ao logar");
  }
}

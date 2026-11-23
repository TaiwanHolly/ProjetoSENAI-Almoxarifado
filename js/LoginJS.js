console.log("Código nosso que estás em C# Santificado seja vosso console, venha a nós o vosso array[10] e seja feita, assim, {vossa chave} assim no if{} como no else{}. O for(nosso;de cada dia; nos dai hoje++). Debugai as nossas sentenças assim como nós colocamos o ponto e vírgula esquecido; E não deixeis errar identação mas livrai-nos das funções recursivas. A main()")

if(localStorage.getItem("meuToken")) {
  window.location.href = "home.html"
}


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
    localStorage.setItem("TipoUsuario", dados.tipo)
    window.location.href = "home.html";
  } else {
    console.log("Erro ao logar");
    alert("Usuario ou senha incorretos.");
  }
}

function pageswap() {
  window.location.href = "indexCadastro.html";
}

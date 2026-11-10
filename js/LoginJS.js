async function logar() {
    const usuario = document.getElementById("ipt-usuario").value;
    const senha = document.getElementById("ipt-senha").value;

    const resposta = await fetch("http://localhost:8808/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({usuario:usuario, senha:senha}),
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
        window.location.href = "indexLogin.html";
        console.log(dados.token);
        console.log(dados.usuario);
    }
}
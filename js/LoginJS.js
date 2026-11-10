async function logar() {
    const usuario = document.getElementById("ipt-usuario").value;
    const senha = document.getElementById("ipt-senha").value;

    const resposta = await fetch("http://localhost:8808/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({usuario:usuario, senha:senha}),
    });
}
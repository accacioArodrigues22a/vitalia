document.addEventListener("DOMContentLoaded", () => {
  const btnCadastrar = document.getElementById("btnCadastrar");

  btnCadastrar.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        name: nome,
        email: email,
        password: senha
       })

      });

      const result = await response.json();

      if (response.ok) {
        alert("Usuário cadastrado!");
        window.location.href = "../LOGIN/login.html";
      } else {
        alert(result.error || "Erro ao cadastrar.");
      }

    } catch (error) {
      console.log(error);
      alert("Erro ao conectar com o servidor.");
    }
  });
});

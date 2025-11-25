document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin")

  btnLogin.addEventListener("click", async () => {
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    if (!email || !senha) {
      alert("Preencha todos os campos!")
      return
    }

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: senha
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert("Login realizado com sucesso!")
        window.location.href = "../index.html" 
      } else {
        alert(result.error || "E-mail ou senha incorretos.")
      }

    } catch (error) {
      alert("Erro ao conectar ao servidor.")
      console.log(error)
    }
  })
})

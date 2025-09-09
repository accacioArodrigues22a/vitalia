(function() {
  emailjs.init("eUhe97AbSg4lzh_Q-");
})();

function enviarFeedback() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const feedback = document.getElementById("feedback").value.trim();

  if (!nome || !email || !feedback) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  emailjs.send("service_1vtv36p", "template_ukxb9ts", {
    nome: nome,
    email: email,
    feedback: feedback
  })
  .then(() => {
    alert("Obrigada pelo seu feedback! 💌 Confira seu e-mail.");
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("feedback").value = "";
  })
  .catch((error) => {
    console.error("Erro EmailJS:", error);
    alert("Erro ao enviar: " + JSON.stringify(error));
  });
}


(function() {
  emailjs.init("eUhe97AbSg4lzh_Q-");
})();

function enviarFeedback() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const feedback = document.getElementById("feedback").value;

  emailjs.send("template_ukxb9ts", "service_1vtv36p", {
    nome: nome,
    email: email,
    feedback: feedback
  }).then(
    function() {
      alert("Obrigada pelo seu feedback! 💌 Confira seu e-mail.");
    },
    function(error) {
      alert("Erro ao enviar. Tente novamente.");
      console.error(error);
    }
  );
}

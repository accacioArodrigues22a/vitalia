const PUBLIC_KEY = "67FNIpiHZOcS5nIob";  
const SERVICE_ID = "service_1vtv36p";  
const TEMPLATE_ID = "template_ukxb9ts"; 

(function() {
  emailjs.init(PUBLIC_KEY);
})();

function enviarFeedback() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const feedback = document.getElementById("feedback").value.trim();

  if (!nome || !email || !feedback) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const payload = { nome, email, feedback };

  console.log("Enviando payload:", payload);

  emailjs.send(SERVICE_ID, TEMPLATE_ID, payload)
    .then(function(response) {
      console.log("EmailJS success:", response);
      alert("🎉 Bem-vindo ao serviço Vitalia!\n\n💌 Muito obrigada pelo seu feedback, ele é muito importante para nós!");
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
      document.getElementById("feedback").value = "";
    })
    .catch(function(error) {
      console.error("EmailJS error:", error);
      alert("Erro ao enviar.");
    });
}





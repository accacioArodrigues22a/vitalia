document.addEventListener('DOMContentLoaded', function() {
  const characterCards = document.querySelectorAll('.character-card');
  const startBtn = document.getElementById('startBtn');
  const loadingContainer = document.getElementById('loadingContainer');
  let selectedCharacter = null;

  // Som de coleta
  const buttonSound = new Audio("../IMGSjogo/button.mp3");

  // Efeito de sombra ao passar o mouse nos cards
  characterCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('selected')) {
        card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('selected')) {
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      }
    });

    // Clicar no personagem
    card.addEventListener('click', () => {
      characterCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedCharacter = card.dataset.file;
      localStorage.setItem("selectedCharacter", selectedCharacter);

      // Tocar som de clicar
      buttonSound.currentTime = 0;
      buttonSound.play();

      // Ativar botão
      startBtn.disabled = false;
    });
  });

  // Iniciar jogo
  startBtn.addEventListener('click', () => {
    if (!selectedCharacter) {
      showNotification('Escolha um personagem antes de começar!', 'error');
      return;
    }
    
    // Mostrar loading
    startBtn.classList.add('loading');
    loadingContainer.classList.add('visible');
    
    // Simular tempo de carregamento
    setTimeout(() => {
      window.location.href = "../jogo.html"; // leva para fase 1
    }, 1500);
  });

  // Função para mostrar notificações
  function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (type === 'error') {
      notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    } else {
      notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const loadingContainer = document.getElementById('loadingContainer');
  const progressFill = document.getElementById('progressFill');
  const loadingProgress = document.getElementById('loadingProgress');
  const loadingTip = document.getElementById('loadingTip');
  const errorMessage = document.getElementById('errorMessage');
  const retryButton = document.getElementById('retryButton');
  const character = localStorage.getItem("selectedCharacter");

  // ==================== CONFIGURAÇÕES ====================
  const IMGS_PATH = '../IMGSjogo/';
  
  // Dicas de carregamento
  const loadingTips = [
    "Dica: Colete todas as frutas para avançar!",
    "Dica: Cuidado com os inimigos! Eles ficam mais rápidos a cada fruta coletada.",
    "Dica: Encontre a fruta dourada para ganhar uma vida extra!",
    "Dica: Use as teclas de seta para mover o personagem.",
    "Dica: Pressione P para pausar o jogo."
  ];

  // ==================== PLAYER ====================
  const player = {
    x: 50,
    y: 50,
    size: 20,
    speed: 2,
    lives: parseInt(localStorage.getItem("lives")) || 3,
    score: parseInt(localStorage.getItem("score")) || 0,
    invincible: false,
    image: new Image()
  };
  
  // Define a imagem do personagem com fallback
  if (character) {
    player.image.src = IMGS_PATH + character;
  } else {
    player.image.src = IMGS_PATH + 'player1.png';
  }

  // ==================== MONSTERS ====================
  const monster1 = { x: 300, y: 400, size: 20, speed: 1.5, image: new Image() };
  monster1.image.src = IMGS_PATH + 'enemy.png';

  const monster2 = { x: 350, y: 50, size: 20, speed: 1.2, image: new Image() };
  monster2.image.src = IMGS_PATH + 'enemy.png';

  // ==================== MAP ====================
  const obstacles = [
    {x: 100, y: 100, width: 200, height: 20},
    {x: 50, y: 200, width: 20, height: 150},
    {x: 200, y: 300, width: 150, height: 20},
    {x: 300, y: 150, width: 20, height: 120}
  ];

  const fruits = [
    {x: 50, y: 350, size: 20, collected: false, image: new Image()},
    {x: 350, y: 350, size: 20, collected: false, image: new Image()},
    {x: 200, y: 50, size: 20, collected: false, image: new Image()}
  ];
  
  fruits[0].image.src = IMGS_PATH + 'fruit1.png';
  fruits[1].image.src = IMGS_PATH + 'fruit2.png';
  fruits[2].image.src = IMGS_PATH + 'fruit3.png';

  // POWER-UP raro
  const powerUp = { x: 180, y: 200, size: 20, collected: false, image: new Image() };
  powerUp.image.src = IMGS_PATH + 'fruit_gold.png';

  // ==================== SOUNDS ====================
  const collectSound = new Audio(IMGS_PATH + 'collect.mp3');
  const hitSound = new Audio(IMGS_PATH + 'hit.mp3');

  // ==================== CONTROLS ====================
  const keys = {};
  let paused = false;
  let imagesLoaded = 0;
  let totalImagesToLoad = 0;
  let imagesToLoad = [];
  let loadingTimeout = null;

  document.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === "p" || e.key === "P") paused = !paused;
  });
  document.addEventListener('keyup', e => keys[e.key] = false);

  // ==================== SISTEMA DE CARREGAMENTO MELHORADO ====================
  function updateLoadingProgress() {
    const progress = Math.round((imagesLoaded / totalImagesToLoad) * 100);
    progressFill.style.width = progress + '%';
    loadingProgress.textContent = progress + '%';
    
    // Atualizar dica a cada 25% de progresso
    if (progress % 25 === 0) {
      const randomTip = loadingTips[Math.floor(Math.random() * loadingTips.length)];
      loadingTip.textContent = randomTip;
    }
  }

  function imageLoaded() {
    imagesLoaded++;
    updateLoadingProgress();
    
    if (imagesLoaded >= totalImagesToLoad) {
      clearTimeout(loadingTimeout);
      // Todas as imagens carregadas, inicia o jogo
      setTimeout(() => {
        loadingContainer.style.opacity = '0';
        setTimeout(() => {
          loadingContainer.style.display = 'none';
          gameLoop();
        }, 500);
      }, 500);
    }
  }

  function imageError(imageSrc) {
    console.error("Erro ao carregar imagem:", imageSrc);
    imagesLoaded++;
    updateLoadingProgress();
    errorMessage.textContent = `Erro ao carregar: ${imageSrc.split('/').pop()}`;
    errorMessage.style.display = 'block';
  }

  function initImageLoading() {
    // Coletar todas as imagens que precisam ser carregadas
    imagesToLoad = [
      {img: player.image, src: player.image.src},
      {img: monster1.image, src: monster1.image.src},
      {img: monster2.image, src: monster2.image.src},
      {img: fruits[0].image, src: fruits[0].image.src},
      {img: fruits[1].image, src: fruits[1].image.src},
      {img: fruits[2].image, src: fruits[2].image.src},
      {img: powerUp.image, src: powerUp.image.src}
    ];
    
    totalImagesToLoad = imagesToLoad.length;
    
    // Configurar event listeners para todas as imagens
    imagesToLoad.forEach(item => {
      item.img.onload = imageLoaded;
      item.img.onerror = () => imageError(item.src);
    });
    
    // Timeout para caso alguma imagem não carregue
    loadingTimeout = setTimeout(() => {
      if (imagesLoaded < totalImagesToLoad) {
        errorMessage.textContent = "Carregamento demorando mais que o esperado...";
        errorMessage.style.display = 'block';
        retryButton.style.display = 'block';
      }
    }, 10000);
    
    updateLoadingProgress();
  }

  // Botão para tentar novamente
  retryButton.addEventListener('click', function() {
    errorMessage.style.display = 'none';
    retryButton.style.display = 'none';
    imagesLoaded = 0;
    initImageLoading();
  });

  // ==================== COLLISIONS ====================
  function isCollidingWithObstacle(x, y, size) {
    return obstacles.some(obs =>
      x < obs.x + obs.width &&
      x + size > obs.x &&
      y < obs.y + obs.height &&
      y + size > obs.y
    );
  }

  // ==================== PLAYER ====================
  function movePlayer() {
    let nextX = player.x;
    let nextY = player.y;

    if (keys['ArrowUp']) nextY -= player.speed;
    if (keys['ArrowDown']) nextY += player.speed;
    if (keys['ArrowLeft']) nextX -= player.speed;
    if (keys['ArrowRight']) nextX += player.speed;

    if (nextX >= 0 && nextX + player.size <= canvas.width &&
        !isCollidingWithObstacle(nextX, player.y, player.size)) {
      player.x = nextX;
    }
    if (nextY >= 0 && nextY + player.size <= canvas.height &&
        !isCollidingWithObstacle(player.x, nextY, player.size)) {
      player.y = nextY;
    }
  }

  // ==================== MONSTERS ====================
  function moveMonster(monster) {
    let nextX = monster.x;
    let nextY = monster.y;

    if (monster.x < player.x) nextX += monster.speed;
    if (monster.x > player.x) nextX -= monster.speed;
    if (monster.y < player.y) nextY += monster.speed;
    if (monster.y > player.y) nextY -= monster.speed;

    if (!isCollidingWithObstacle(nextX, monster.y, monster.size)) monster.x = nextX;
    if (!isCollidingWithObstacle(monster.x, nextY, monster.size)) monster.y = nextY;
  }

  // ==================== DRAW ====================
  function drawPlayer() {
    if (player.invincible && Math.floor(Date.now() / 100) % 2 === 0) return;
    
    if (player.image.complete && player.image.naturalHeight !== 0) {
      ctx.drawImage(player.image, player.x, player.y, player.size, player.size);
    } else {
      // Fallback
      ctx.fillStyle = "#3498db";
      ctx.fillRect(player.x, player.y, player.size, player.size);
    }
  }
  
  function drawMonster(monster) {
    if (monster.image.complete && monster.image.naturalHeight !== 0) {
      ctx.drawImage(monster.image, monster.x, monster.y, monster.size, monster.size);
    } else {
      // Fallback
      ctx.fillStyle = "#e74c3c";
      ctx.fillRect(monster.x, monster.y, monster.size, monster.size);
    }
  }
  
  function drawObstacles() {
    ctx.fillStyle = "#34495e";
    obstacles.forEach(obs => {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.strokeStyle = "#2c3e50";
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    });
  }
  
  function drawFruits() {
    fruits.forEach((fruit, index) => {
      if (!fruit.collected) {
        if (fruit.image.complete && fruit.image.naturalHeight !== 0) {
          ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.size, fruit.size);
        } else {
          // Fallback
          const colors = ["#e74c3c", "#f39c12", "#2ecc71"];
          ctx.fillStyle = colors[index];
          ctx.beginPath();
          ctx.arc(fruit.x + fruit.size/2, fruit.y + fruit.size/2, fruit.size/2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  }
  
  function drawPowerUp() {
    if (!powerUp.collected) {
      if (powerUp.image.complete && powerUp.image.naturalHeight !== 0) {
        ctx.drawImage(powerUp.image, powerUp.x, powerUp.y, powerUp.size, powerUp.size);
      } else {
        // Fallback
        ctx.fillStyle = "#f1c40f";
        ctx.beginPath();
        ctx.arc(powerUp.x + powerUp.size/2, powerUp.y + powerUp.size/2, powerUp.size/2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  
  function drawHUD() {
    ctx.fillStyle = "#ecf0f1";
    ctx.font = "16px 'Segoe UI', sans-serif";
    ctx.fillText(`Vidas: ${player.lives}`, 10, 20);
    ctx.fillText(`Pontos: ${player.score}`, 10, 40);
    ctx.fillText("Fase 2", canvas.width - 70, 20);

    if (paused) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ecf0f1";
      ctx.font = "30px 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("PAUSADO", canvas.width/2, canvas.height/2);
      ctx.textAlign = "left";
    }
  }

  // ==================== GAME LOGIC ====================
  function checkFruitCollection() {
    fruits.forEach(fruit => {
      if (!fruit.collected &&
        player.x < fruit.x + fruit.size &&
        player.x + player.size > fruit.x &&
        player.y < fruit.y + fruit.size &&
        player.y + player.size > fruit.y
      ) {
        fruit.collected = true;
        player.score += 20;
        monster1.speed += 0.2;
        monster2.speed += 0.2;
        collectSound.play().catch(e => console.log("Erro ao reproduzir som"));
      }
    });

    // Checar power-up
    if (!powerUp.collected &&
      player.x < powerUp.x + powerUp.size &&
      player.x + player.size > powerUp.x &&
      player.y < powerUp.y + powerUp.size &&
      player.y + player.size > powerUp.y
    ) {
      powerUp.collected = true;
      player.lives++;
      player.score += 50;
      collectSound.play().catch(e => console.log("Erro ao reproduzir som"));
    }

    const allCollected = fruits.every(fruit => fruit.collected);
    if (allCollected) {
      if (player.lives > 2) player.score += 100;
      localStorage.setItem('gameResult', 'Parabéns! Você completou todas as fases!');
      localStorage.setItem('score', player.score);
      localStorage.setItem('lives', player.lives);
      window.location.href = '../fim/fim.html';
    }
  }

  function checkCollision(monster) {
    if (
      player.x < monster.x + monster.size &&
      player.x + player.size > monster.x &&
      player.y < monster.y + monster.size &&
      player.y + player.size > monster.y
    ) {
      if (!player.invincible) {
        hitSound.play().catch(e => console.log("Erro ao reproduzir som"));
        player.lives--;
        player.invincible = true;
        setTimeout(() => player.invincible = false, 1500);

        if (player.lives <= 0) {
          localStorage.setItem('gameResult', 'Você foi pego na Fase 2!');
          localStorage.setItem('score', player.score);
          window.location.href = '../fim/fim.html';
        }
      }
    }
  }

  // ==================== GAME LOOP ====================
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!paused) {
      movePlayer();
      moveMonster(monster1);
      moveMonster(monster2);
      checkCollision(monster1);
      checkCollision(monster2);
      checkFruitCollection();
    }

    drawObstacles();
    drawFruits();
    drawPowerUp();
    drawPlayer();
    drawMonster(monster1);
    drawMonster(monster2);
    drawHUD();

    requestAnimationFrame(gameLoop);
  }

  // Inicia o carregamento
  initImageLoading();
});
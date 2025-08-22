const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const character = localStorage.getItem("selectedCharacter");

// ==================== PLAYER ====================
const player = {
  x: 50,
  y: 50,
  size: 20,
  speed: 2,
  lives: 3,
  score: 0,
  invincible: false,
  image: new Image()
};
player.image.src = `./IMGSjogo/${character}`;

// ==================== MONSTER ====================
const monster = {
  x: 300,
  y: 300,
  size: 20,
  speed: 1,
  image: new Image()
};
monster.image.src = './IMGSjogo/enemy.png';

// ==================== MAP ====================
const obstacles = [
  {x: 100, y: 100, width: 100, height: 20},
  {x: 200, y: 200, width: 20, height: 100}
];

const fruits = [
  {x: 150, y: 50, size: 20, collected: false, image: new Image()},
  {x: 250, y: 250, size: 20, collected: false, image: new Image()},
  {x: 50, y: 300, size: 20, collected: false, image: new Image()}
];

fruits[0].image.src = './IMGSjogo/fruit1.png';
fruits[1].image.src = './IMGSjogo/fruit2.png';
fruits[2].image.src = './IMGSjogo/fruit3.png';

// ==================== SOUNDS ====================
const collectSound = new Audio('./IMGSjogo/collect.mp3');
const hitSound = new Audio('./IMGSjogo/hit.mp3');

// ==================== CONTROLS ====================
const keys = {};
let paused = false;

document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (e.key === "p" || e.key === "P") paused = !paused;
});
document.addEventListener('keyup', e => keys[e.key] = false);

// ==================== COLLISIONS ====================
function isCollidingWithObstacle(x, y, size) {
  return obstacles.some(obs =>
    x < obs.x + obs.width &&
    x + size > obs.x &&
    y < obs.y + obs.height &&
    y + size > obs.y
  );
}

// ==================== PLAYER MOVEMENT ====================
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

// ==================== MONSTER AI ====================
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
  if (player.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
    return; // efeito piscando
  }
  ctx.drawImage(player.image, player.x, player.y, player.size, player.size);
}

function drawMonster(monster) {
  ctx.drawImage(monster.image, monster.x, monster.y, monster.size, monster.size);
}

function drawObstacles() {
  ctx.fillStyle = "#555";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function drawFruits() {
  fruits.forEach(fruit => {
    if (!fruit.collected) {
      ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.size, fruit.size);
    }
  });
}

function drawHUD() {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(`Vidas: ${player.lives}`, 10, 20);
  ctx.fillText(`Pontos: ${player.score}`, 10, 40);
  ctx.fillText("Fase 1", canvas.width - 70, 20);

  if (paused) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("PAUSADO", canvas.width/2 - 70, canvas.height/2);
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
      player.score += 10;
      monster.speed += 0.2; // aumenta a dificuldade
      collectSound.play();
    }
  });

  const allCollected = fruits.every(fruit => fruit.collected);
  if (allCollected) {
    localStorage.setItem('gameResult', 'Parabéns! Fase 1 concluída!');
    localStorage.setItem('score', player.score);
    window.location.href = './fase2/jogo2.html';
  }
}

function checkCollision() {
  if (
    player.x < monster.x + monster.size &&
    player.x + player.size > monster.x &&
    player.y < monster.y + monster.size &&
    player.y + player.size > monster.y
  ) {
    if (!player.invincible) {
      hitSound.play();
      player.lives--;
      player.invincible = true;

      setTimeout(() => {
        player.invincible = false;
      }, 1500);

      if (player.lives <= 0) {
        localStorage.setItem('gameResult', 'Você foi pego pelo monstro!');
        localStorage.setItem('score', player.score);
        window.location.href = './fim/fim.html';
      }
    }
  }
}

// ==================== GAME LOOP ====================
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!paused) {
    movePlayer();
    moveMonster(monster);
    checkCollision();
    checkFruitCollection();
  }

  drawObstacles();
  drawFruits();
  drawPlayer();
  drawMonster(monster);
  drawHUD();

  requestAnimationFrame(gameLoop);
}

gameLoop();

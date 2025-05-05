import { Warrior } from './warrior.js';
import { Mage } from './mage.js';
import { log, gameOver } from './utils.js';

let player, enemy;

const nameInput = document.getElementById("player-name");
const battlefield = document.getElementById("battlefield");

document.getElementById("choose-warrior").addEventListener("click", () => {
  const name = nameInput.value || "Vous (Guerrier)";
  player = new Warrior(name);
  enemy = new Mage("Ennemi (Mage)");
  startGame();
});

document.getElementById("choose-mage").addEventListener("click", () => {
  const name = nameInput.value || "Vous (Mage)";
  player = new Mage(name);
  enemy = new Warrior("Ennemi (Guerrier)");
  startGame();
});

function startGame() {
  document.getElementById("character-selection").style.display = "none";
  battlefield.style.display = "flex";

  updateInfo();
  updateVisuals();

  const actions = document.getElementById("actions");
  actions.innerHTML = '';

  const attackBtn = document.createElement("button");
  attackBtn.textContent = "Attaquer";
  attackBtn.addEventListener("click", () => {
    player.attack(enemy);
    updateInfo();
    updateVisuals();
    checkGameOver();

    if (enemy.alive) {
      setTimeout(() => {
        enemy.attack(player);
        updateInfo();
        updateVisuals();
        checkGameOver();
      }, 500);
    }
  });
  actions.appendChild(attackBtn);

  if (player instanceof Mage) {
    const spellBtn = document.createElement("button");
    spellBtn.textContent = "Lancer un sort";
    spellBtn.addEventListener("click", () => {
      player.castSpell(enemy);
      updateInfo();
      updateVisuals();
      checkGameOver();

      if (enemy.alive) {
        setTimeout(() => {
          enemy.attack(player);
          updateInfo();
          updateVisuals();
          checkGameOver();
        }, 500);
      }
    });
    actions.appendChild(spellBtn);
  }

  log("Le combat commence !");
}

function updateInfo() {
  document.getElementById("character-name").textContent = player.name;
  document.getElementById("character-health").textContent = `Santé : ${player.hp}`;
  document.getElementById("character-mana").textContent = `Mana : ${player.mana ?? 0}`;
}

function updateVisuals() {
  document.getElementById("player-name-label").textContent = player.name;
  document.getElementById("enemy-name-label").textContent = enemy.name;
  document.getElementById("player-hp-label").textContent = `HP: ${player.hp}`;
  document.getElementById("enemy-hp-label").textContent = `HP: ${enemy.hp}`;

  if (!player.alive) {
    document.getElementById("player-img").classList.add("dead");
  }
  if (!enemy.alive) {
    document.getElementById("enemy-img").classList.add("dead");
  }
}

function checkGameOver() {
    if (!player.alive) {
      gameOver(`${player.name}`);
    } else if (!enemy.alive) {
      gameOver(`${enemy.name}`);
    }
  }
  

function addResetButton() {
  const actions = document.getElementById("actions");
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "🔁 Rejouer";
  resetBtn.addEventListener("click", () => window.location.reload());
  actions.innerHTML = '';
  actions.appendChild(resetBtn);
}
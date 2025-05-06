// js/main.js
import { log, gameOver } from './utils.js';
import { Fighter }    from './Fighter.js';
import { Paladin }    from './Paladin.js';
import { Monk }       from './Monk.js';
import { Berzerker }  from './Berzerker.js';
import { Assassin }   from './Assassin.js';
import { Wizard }     from './Wizard.js';
import { Ranger }     from './Ranger.js';

const classes = {
  fighter:    Fighter,
  paladin:    Paladin,
  monk:       Monk,
  berzerker:  Berzerker,
  assassin:   Assassin,
  wizard:     Wizard,
  ranger:     Ranger
};

const selectors = {
  fighter:    document.getElementById("choose-fighter"),
  paladin:    document.getElementById("choose-paladin"),
  monk:       document.getElementById("choose-monk"),
  berzerker:  document.getElementById("choose-berzerker"),
  assassin:   document.getElementById("choose-assassin"),
  wizard:     document.getElementById("choose-wizard"),
  ranger:     document.getElementById("choose-ranger")
};

let combatants = [];
let player = null;
let currentTurn = 1;
const maxTurns = 10;

Object.entries(selectors).forEach(([key, btn]) => {
  btn.addEventListener("click", () => {
    const name = document.getElementById("player-name").value || `Vous (${key})`;
    player = new classes[key](name);
    initCombat();
  });
});

function initCombat() {
  document.getElementById("character-selection").style.display = "none";
  document.getElementById("battlefield").style.display         = "flex";
  document.getElementById("actions").style.display             = "block";

  combatants = [ player ];
  for (let key of Object.keys(classes)) {
    if (classes[key] !== player.constructor) {
      combatants.push(new classes[key](`CPU ${key}`));
    }
  }

  log(`🗡️ Début du free-for-all (Tour ${currentTurn}/${maxTurns}) !`);
  renderCombatants();
  populateTargets();
}

function renderCombatants() {
  const bf = document.getElementById("battlefield");
  bf.innerHTML = '';
  combatants.forEach((c, idx) => {
    const div = document.createElement("div");
    div.classList.add("character");
    if (!c.alive) div.classList.add("dead");
    div.id = `char-${idx}`;
    div.innerHTML = `
      <img src="${c.image}" alt="${c.name}">
      <p><strong>${c.name}</strong></p>
      <p>HP: <span class="hp">${c.hp}</span></p>
      <p>Mana: <span class="mana">${c.mana}</span></p>
    `;
    bf.appendChild(div);
  });
}

function populateTargets() {
  const select = document.getElementById("target-select");
  select.innerHTML = '';
  combatants
    .filter(c => c.alive && c !== player)
    .forEach((c, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = c.name;
      select.appendChild(opt);
    });
}

document.getElementById("btn-attack").addEventListener("click", () => doTurn('attack'));
document.getElementById("btn-special").addEventListener("click", () => doTurn('special'));

function doTurn(actionType) {
  if (!player.alive) return;

  const targetIdx = +document.getElementById("target-select").value;
  const target    = combatants.filter(c => c.alive && c !== player)[targetIdx];

  // Tour du joueur
  if (actionType === 'attack') {
    player.attack(target);
  } else {
    // Attaque spéciale
    if (player instanceof Ranger) {
      // Ranger : attaque tous les autres vivants
      const ennemis = combatants.filter(c => c.alive && c !== player);
      player.specialAttack(ennemis);
    } else {
      // Toutes les autres classes prennent une seule cible
      player.specialAttack(target);
    }
  }

  updateState();
  if (checkEnd()) return;

  // Tours CPU
  for (let cpu of combatants.filter(c => c.alive && c !== player)) {
    const possibles = combatants.filter(x => x.alive && x !== cpu);
    const choice    = possibles[Math.floor(Math.random() * possibles.length)];
    if (cpu instanceof Ranger) {
      // CPU Ranger attaque tous
      const ennemis = combatants.filter(c => c.alive && c !== cpu);
      cpu.specialAttack(ennemis);
    } else {
      // CPU autres classes, choix aléatoire attaque ou spécial
      Math.random() < 0.5
        ? cpu.attack(choice)
        : cpu.specialAttack(choice);
    }
    updateState();
    if (checkEnd()) return;
  }

  // Passage au tour suivant
  currentTurn++;
  if (currentTurn > maxTurns) {
    const alive  = combatants.filter(c => c.alive);
    const winner = alive.reduce((a,b) => a.hp >= b.hp ? a : b);
    log(`⏱️ Limite de tours atteinte (${maxTurns}).`);
    log(`🏆 ${winner.name} a le plus de HP (${winner.hp}) et gagne !`);
    gameOver(winner.name);
  } else {
    log(`— Début du Tour ${currentTurn}/${maxTurns} —`);
    populateTargets();
  }
}

function updateState() {
  combatants.forEach((c, idx) => {
    const div = document.getElementById(`char-${idx}`);
    div.querySelector('.hp').textContent   = c.hp;
    div.querySelector('.mana').textContent = c.mana;
    if (!c.alive) div.classList.add("dead");
  });
}

function checkEnd() {
  if (!player.alive) {
    log(`💀 ${player.name} est KO ! Fin du jeu.`);
    gameOver(player.name);
    return true;
  }
  const alive = combatants.filter(c => c.alive);
  if (alive.length <= 1) {
    if (alive.length === 1) log(`🏆 ${alive[0].name} est le dernier survivant !`);
    else                   log("🤝 Tout le monde est KO, match nul !");
    gameOver(alive[0]?.name || "Personne");
    return true;
  }
  return false;
}
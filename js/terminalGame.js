import { Fighter } from './Fighter.js';
import { Paladin } from './Paladin.js';
import { Monk } from './Monk.js';
import { Berzerker } from './Berzerker.js';
import { Assassin } from './Assassin.js';
import { Wizard } from './Wizard.js';
import { Ranger } from './Ranger.js';

const readline = await import('node:readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const classes = {
  fighter: Fighter,
  paladin: Paladin,
  monk: Monk,
  berzerker: Berzerker,
  assassin: Assassin,
  wizard: Wizard,
  ranger: Ranger,
};

async function main() {
  console.log("Bienvenue dans le RPG Terminal Free-for-All !");
  const name = await rl.question("Quel est ton nom de personnage ? ");
  
  const classNames = Object.keys(classes);
  console.log("Choisis ta classe :");
  classNames.forEach((cls, idx) => console.log(`${idx + 1}. ${cls}`));

  const classIndex = await rl.question("Tape le numéro de ta classe : ");
  const className = classNames[parseInt(classIndex) - 1];
  const PlayerClass = classes[className];
  const player = new PlayerClass(name || `Vous (${className})`);

  const combatants = [player];

  for (let key of classNames) {
    if (classes[key] !== PlayerClass) {
      combatants.push(new classes[key](`CPU ${key}`));
    }
  }

  let currentTurn = 1;
  const maxTurns = 10;

  console.log(`🗡️ Début du free-for-all (Tour ${currentTurn}/${maxTurns}) !`);

  while (currentTurn <= maxTurns) {
    if (!player.alive) {
      console.log(`💀 ${player.name} est KO ! Fin du jeu.`);
      break;
    }

    console.log(`\n===== Tour ${currentTurn} =====`);
    showStatus(combatants);

    const targets = combatants.filter(c => c.alive && c !== player);
    targets.forEach((t, i) => console.log(`${i + 1}. ${t.name}`));
    const targetIdx = await rl.question("Cible ? ");
    const action = await rl.question("Attaque normale (a) ou spéciale (s) ? ");
    const target = targets[parseInt(targetIdx) - 1];

    if (action === 'a') player.attack(target);
    else {
      if (player instanceof Ranger) {
        const enemies = combatants.filter(c => c.alive && c !== player);
        player.specialAttack(enemies);
      } else {
        player.specialAttack(target);
      }
    }

    for (let cpu of combatants.filter(c => c.alive && c !== player)) {
      const possibles = combatants.filter(x => x.alive && x !== cpu);
      const choice = possibles[Math.floor(Math.random() * possibles.length)];
      if (cpu instanceof Ranger) {
        const enemies = combatants.filter(c => c.alive && c !== cpu);
        cpu.specialAttack(enemies);
      } else {
        Math.random() < 0.5
          ? cpu.attack(choice)
          : cpu.specialAttack(choice);
      }
    }

    const alive = combatants.filter(c => c.alive);
    if (alive.length <= 1) {
      if (alive.length === 1) console.log(`🏆 ${alive[0].name} est le dernier survivant !`);
      else console.log("🤝 Tout le monde est KO, match nul !");
      break;
    }

    currentTurn++;
  }

  rl.close();
}

function showStatus(combatants) {
  console.log("\n--- État des combattants ---");
  combatants.forEach(c => {
    console.log(`${c.name} | HP: ${c.hp} | Mana: ${c.mana} | ${c.alive ? "🟢" : "💀"}`);
  });
}

main();

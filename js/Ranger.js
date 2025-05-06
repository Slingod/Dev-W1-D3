import { Character } from './character.js';
import { log } from './utils.js';

export class Ranger extends Character {
  constructor(name) {
    // Ranger : hp 14, dmg 3, mana 50
    super(name, 14, 3, 50, 'images/ranger.png');
  }

  specialAttack(targets) {
    // Rain of Arrows : 5 dégâts à chaque adversaire, coûte 30 mana
    if (this.mana >= 30) {
      this.mana -= 30;
      log(`${this.name} déclenche Rain of Arrows !`);
      targets.forEach(t => {
        if (t.alive) {
          log(` → ${this.name} touche ${t.name} pour 5 dégâts.`);
          t.takeDamage(5);
        }
      });
    } else {
      log(`${this.name} n’a pas assez de mana pour Rain of Arrows !`);
    }
  }
}
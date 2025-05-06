import { Character } from './character.js';
import { log } from './utils.js';

export class Monk extends Character {
  constructor(name) {
    // hp 8, dmg 2, mana 200
    super(name, 8, 2, 200, 'images/mage.png');
  }

  specialAttack() {
    if (this.mana >= 25) {
      this.mana -= 25;
      this.hp += 8;
      log(`${this.name} se soigne de 8 HP grâce à Heal.`);
    } else {
      log(`${this.name} n’a pas assez de mana pour Heal !`);
    }
  }
}
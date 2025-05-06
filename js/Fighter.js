import { Character } from './character.js';
import { log } from './utils.js';

export class Fighter extends Character {
  constructor(name) {
    // hp 12, dmg 4, mana 40
    super(name, 12, 4, 40, 'images/guerrier.png');
  }

  specialAttack(target) {
    if (this.mana >= 20) {
      this.mana -= 20;
      log(`${this.name} utilise Dark Vision sur ${target.name} pour 5 dégâts.`);
      target.takeDamage(5);
    } else {
      log(`${this.name} n’a pas assez de mana pour Dark Vision !`);
    }
  }
}
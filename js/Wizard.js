import { Character } from './character.js';
import { log } from './utils.js';

export class Wizard extends Character {
  constructor(name) {
    // Wizard : hp 10, dmg 2, mana 200
    super(name, 10, 2, 200, 'images/wizard.png');
  }

  specialAttack(target) {
    // Fireball : 7 dégâts, coûte 25 mana
    if (this.mana >= 25) {
      this.mana -= 25;
      log(`${this.name} lance Fireball sur ${target.name} pour 7 dégâts.`);
      target.takeDamage(7);
    } else {
      log(`${this.name} n’a pas assez de mana pour Fireball !`);
    }
  }
}
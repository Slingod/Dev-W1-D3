import { Character } from './character.js';
import { log } from './utils.js';

export class Paladin extends Character {
  constructor(name) {
    // hp 16, dmg 3, mana 160
    super(name, 16, 3, 160, 'images/paladin.png');
  }

  specialAttack(target) {
    if (this.mana >= 40) {
      this.mana -= 40;
      this.hp += 5;
      log(`${this.name} utilise Healing Lighting sur ${target.name}, inflige 4 dégâts et se soigne de 5 HP.`);
      target.takeDamage(4);
    } else {
      log(`${this.name} n’a pas assez de mana pour Healing Lighting !`);
    }
  }
}
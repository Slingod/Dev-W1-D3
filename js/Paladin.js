import { Character } from './character.js';
import { log } from './utils.js';

export class Paladin extends Character {
  constructor(name) {
    // hp 20, dmg 2, mana 160
    super(name, 20, 2, 160, 'images/paladin.png');
  }

  specialAttack(target) {
    if (this.mana >= 40) {
      this.mana -= 40;
      this.hp += 5;
      log(`${this.name} utilise Healing Lighting sur ${target.name}, inflige 3 dégâts et se soigne de 5 HP.`);
      target.takeDamage(3);
    } else {
      log(`${this.name} n’a pas assez de mana pour Healing Lighting !`);
    }
  }
}
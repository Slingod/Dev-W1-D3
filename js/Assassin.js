import { Character } from './character.js';
import { log } from './utils.js';

export class Assassin extends Character {
  constructor(name) {
    // hp 6, dmg 6, mana 20
    super(name, 6, 6, 20, 'images/assassin.png');
  }

  specialAttack(target) {
    if (this.mana >= 20) {
      this.mana -= 20;
      this.isProtected = true;
      log(`${this.name} utilise Shadow Hit sur ${target.name} pour 7 dégâts et devient invulnérable.`);
      target.takeDamage(7);
    } else {
      log(`${this.name} n’a pas assez de mana pour Shadow Hit !`);
    }
  }
}
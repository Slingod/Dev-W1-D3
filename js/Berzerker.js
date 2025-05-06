import { Character } from './character.js';
import { log } from './utils.js';

export class Berzerker extends Character {
  constructor(name) {
    // hp 8, dmg 4, mana 0
    super(name, 8, 4, 0, 'images/berzerk.png');
  }

  specialAttack() {
    this.hp -= 1;
    this.dmg += 1;
    log(`${this.name} entre en Rage : +1 dmg (maintenant ${this.dmg}), -1 HP (reste ${this.hp}).`);
    if (this.hp <= 0) {
      this.alive = false;
      log(`${this.name} meurt de Rage !`);
    }
  }
}
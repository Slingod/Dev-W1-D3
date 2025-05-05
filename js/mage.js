import { log } from './utils.js';
import { Character } from './character.js';

export class Mage extends Character {
  constructor(name) {
    super(name, 70, 25);
  }

  castSpell(target) {
    log(`${this.name} lance un sort sur ${target.name} !`);
    target.takeDamage(this.attackPower + 10);
  }
}
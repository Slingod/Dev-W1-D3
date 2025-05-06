import { log } from './utils.js';

export class Character {
  constructor(name, hp, dmg, mana = 0, image = '') {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.alive = true;
    this.image = image;
    this.isProtected = false;
  }

  attack(target) {
    if (!this.alive || !target.alive) return;
    log(`${this.name} attaque ${target.name} pour ${this.dmg} dégâts.`);
    target.takeDamage(this.dmg);
  }

  takeDamage(damage) {
    if (!this.alive) return;
    if (this.isProtected) {
      log(`${this.name} évite les dégâts grâce à sa protection !`);
      this.isProtected = false;
      return;
    }
    this.hp -= damage;
    log(`${this.name} a maintenant ${this.hp} HP.`);
    if (this.hp <= 0) {
      this.alive = false;
      log(`${this.name} est KO !`);
    }
  }
}
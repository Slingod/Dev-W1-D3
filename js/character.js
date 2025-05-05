import { log, gameOver } from './utils.js'; // 👈 on importe une nouvelle fonction gameOver

export class Character {
  constructor(name, hp, attackPower) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
    this.alive = true;
  }

  attack(target) {
    if (!this.alive || !target.alive) return;
    log(`${this.name} attaque ${target.name} pour ${this.attackPower} dégâts.`);
    target.takeDamage(this.attackPower);
  }

  takeDamage(damage) {
    this.hp -= damage;
    log(`${this.name} a maintenant ${this.hp} HP.`);
    if (this.hp <= 0) {
      this.alive = false;
      log(`${this.name} est KO !`);
      gameOver(this.name); // 👈 on appelle gameOver
    }
  }
}

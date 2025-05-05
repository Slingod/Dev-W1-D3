import { Character } from './character.js';
import { log } from './utils.js';


export class Warrior extends Character {
  constructor(name) {
    super(name, 100, 15);
  }

  battleCry() {
    log(`${this.name} crie : Pour la gloire !`);
  }
}

import { Card } from "./Card";
import { Deck } from "./Deck";

export class Player {
  id: number;
  deck: Deck;

  constructor(id: number) {
    this.id = id;
    this.deck = new Deck();
  }

  hasCards(): boolean {
    return this.deck.length > 0;
  }

  playCard(): Card {
    return this.deck.playCard();
  }
}

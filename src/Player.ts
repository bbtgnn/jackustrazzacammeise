import { Card } from "./Card";
import { Deck } from "./Deck";

import "core-js/modules/es.string.pad-start";

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
    const card = this.deck.playCard();
    console.log(
      "P:",
      this.id,
      "|",
      "Cards:",
      (this.deck.length + 1).toString().padStart(3, " "),
      "|",
      "Plays:",
      card.number.toString().padStart(3, " "),
      "| *",
      card.effect,
      "* |",
      "Remaining:",
      this.deck.length.toString().padStart(3, " ")
    );
    return card;
  }
}

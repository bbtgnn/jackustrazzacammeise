import { Card } from "./Card";
import { shuffle } from "./shuffle";

export class Deck {
  cards: Array<Card>;

  constructor(cards: Array<Card> = []) {
    this.cards = cards;
  }

  get length(): number {
    return this.cards.length;
  }

  shuffle(): void {
    this.cards = shuffle(this.cards);
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  addCards(cards: Array<Card>): void {
    this.cards = this.cards.concat(cards);
  }

  removeCard(card: Card): void {
    this.cards.splice(this.cards.indexOf(card), 1);
  }

  empty(): void {
    this.cards = [];
  }

  playCard(): Card {
    const card = this.cards[0];
    this.removeCard(card);
    return card;
  }
}

export const Suits = ["hearts", "spades", "clubs", "diamonds"] as const;
export type Suit = typeof Suits[number];

export const Effects = ["pass", "take"] as const;
export type Effect = typeof Effects[number];

export class Card {
  suit: Suit;
  number: number;
  effect: Effect;

  constructor(suit: Suit, number: number, effect: Effect) {
    this.suit = suit;
    this.number = number;
    this.effect = effect;
  }
}

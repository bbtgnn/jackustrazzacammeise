import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { PointedArray } from "./PointedArray";
import { buildDeck } from "./buildDeck";
import { pass, take } from "./effects";

export class Game {
  players: PointedArray<Player>;
  stack: Deck;

  constructor(playerNum: number) {
    this.players = new PointedArray<Player>();
    this.stack = new Deck();
    // Setupping game
    this._createPlayers(playerNum);
    this._dealCards();
  }

  private _createPlayers(playerNum: number): void {
    for (let i = 0; i < playerNum; i++) {
      this.players.push(new Player(i));
    }
  }

  private _dealCards(): void {
    // Creating deck
    const deck = buildDeck();

    // Calculating remaining cards
    const playerNum = this.players.length;
    const cardNum = deck.length;
    const cardsRemaining = cardNum % playerNum;

    // Dealing cards
    for (let i = 0; i < cardNum - cardsRemaining; i++) {
      const player = this.players.getItem(i);
      player.deck.addCard(deck.cards[i]);
    }

    // The remaining cards go into the stack
    this.stack.addCards(deck.cards.slice(cardNum - cardsRemaining));
  }

  start(): void {
    console.log("");
    console.log("--------------------");
    console.log("/* Starting round */");
    console.log("");
    const card = this.players.current.playCard();
    this.stack.addCard(card);
    this.apply(card);
  }

  /**
   * Card effects
   */

  apply(card: Card): void {
    //
    if (card.effect == "pass") {
      pass(this);
    }
    //
    else if (card.effect == "take") {
      take(this, card);
    }
  }
}

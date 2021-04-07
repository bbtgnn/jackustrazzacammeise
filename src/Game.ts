import { Card, Effect } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { PointedArray } from "./PointedArray";
import { buildDeck } from "./buildDeck";

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

  apply(card: Card): void {
    //
    if (card.effect == "pass") {
      this.pass();
    }
    //
    else if (card.effect == "take") {
      this.take(card);
    }
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

  pass() {
    const nextCard = this.players.increase().playCard();
    this.stack.addCard(nextCard);
    this.apply(nextCard);
  }

  take(card: Card) {
    // Selecting other players
    const activePlayers = this.players.otherItems;
    // We have to set the first one *after* the current
    activePlayers.setCurrentByIndex(this.players.currentIndex);

    // In this variable we count all the positive checks
    let checks: number = 0;
    // And here we store the card with effect
    let nextCard: Card;

    // Initiating take sequence
    console.log("    ↑ start TAKE sequence ↓");
    for (let i = 0; i < card.number; i++) {
      nextCard = activePlayers.current.playCard();
      this.stack.addCard(nextCard);
      //
      if (nextCard.effect == "pass") {
        checks += 1;
        activePlayers.increase();
      }
      //
      else {
        break;
      }
    }

    // Now, if we have all the checks
    if (checks == card.number) {
      //
      console.log("--");
      console.log("P", this.players.current.id, "took the stack! :)");
      // Adding stack cards to player
      this.players.current.deck.addCards(this.stack.cards);
      // Emptying stack
      this.stack.empty();
      // Restarting game
      this.start();
    }
    //
    else {
      // Moving current player
      this.players.setCurrent(activePlayers.current);
      // Applying card effect
      this.apply(nextCard);
    }
  }
}

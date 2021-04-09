import { Card } from "../Card";
import { Game } from "../Game";

export function take(game: Game, card: Card) {
  // Selecting other players
  const activePlayers = game.players.otherItems;
  // We have to set the first one *after* the current
  activePlayers.setCurrentByIndex(game.players.currentIndex);

  // In this variable we count all the positive checks
  let checks: number = 0;
  // And here we store the card with effect
  let nextCard: Card;

  // Initiating take sequence
  console.log("    ↑ start TAKE sequence ↓");
  for (let i = 0; i < card.number; i++) {
    nextCard = activePlayers.current.playCard();
    game.stack.addCard(nextCard);
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
    console.log("P", game.players.current.id, "took the stack!");
    // Adding stack cards to player
    game.players.current.deck.addCards(game.stack.cards);
    // Emptying stack
    game.stack.empty();
    // Restarting game
    game.start();
  }
  //
  else {
    // Moving current player
    game.players.setCurrent(activePlayers.current);
    // Applying card effect
    game.apply(nextCard);
  }
}

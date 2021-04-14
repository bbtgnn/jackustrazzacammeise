import { Game } from "../Game";

export function pass(game: Game): void {
  // Checking end
  game.removeDeadPlayers();
  if (game.isOver()) {
    return;
  }
  //
  const nextCard = game.players.increase().playCard();
  game.stack.addCard(nextCard);
  game.apply(nextCard);
}

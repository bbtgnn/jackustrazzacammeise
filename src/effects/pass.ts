import { Game } from "../Game";

export function pass(game: Game): void {
  const nextCard = game.players.increase().playCard();
  game.stack.addCard(nextCard);
  game.apply(nextCard);
}

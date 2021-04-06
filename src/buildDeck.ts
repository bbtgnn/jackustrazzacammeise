import { Suits, Card } from "./Card";
import { Deck } from "./Deck";

export function buildDeck(): Deck {
  const deck = new Deck();

  for (let suit of Suits) {
    // 0-3 cards
    // Carte da presa
    for (let i = 1; i < 4; i++) {
      deck.addCard(new Card(suit, i, "take"));
    }

    // 4-13 cards
    for (let i = 4; i < 14; i++) {
      deck.addCard(new Card(suit, i, "pass"));
    }
  }

  // Shuffling
  deck.shuffle();

  return deck;
}

// import { Suits, Card, CardSimple } from "./Card";
// import { Deck } from "./Deck";

// export function buildDeck(): Deck {
//   const deck = new Deck();

//   for (let suit of Suits) {
//     // 0-3 cards
//     // Carte da presa
//     for (let i = 1; i < 4; i++) {
//       deck.addCard(new CardSimple(suit, i));
//     }

//     // 4-13 cards
//     for (let i = 4; i < 14; i++) {
//       deck.addCard(new CardSimple(suit, i));
//     }
//   }

//   // Shuffling
//   deck.shuffle();

//   return deck;
// }

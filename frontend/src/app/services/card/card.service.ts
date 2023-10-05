import { Injectable } from '@angular/core';
import { Card } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor() {
  }

  public shuffleCards(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  }
}

import { Card, Studyset } from '@app/models';

export type CardsWithStudyset = {
  studyset: Studyset,
  cards: Card[]
}

import { CardDocument, StudysetDocument } from "../schemas";

export class GetCards {
  studyset: StudysetDocument;
  cards: CardDocument[];
}

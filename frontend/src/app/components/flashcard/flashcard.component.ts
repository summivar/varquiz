import { Component } from '@angular/core';
import { StudysetService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CardsWithStudyset } from '@app/components/studyset/types';
import { Card } from '@app/models';
import { CardService } from '@app/services/card/card.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent {
  dataResponse?: CardsWithStudyset;
  cards!: Card[];
  baseCards?: Card[];
  studysetURL?: string;
  currentId: number = 1;
  studysetId?: string;
  isLoading: boolean = false;
  isShuffled: boolean = false;
  isReversed: boolean = false;
  isFlipped: boolean = false;

  constructor(
    private studysetService: StudysetService,
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: CardService
  ) {
    this.isLoading = true;

    this.route.params.subscribe(params => {
      this.studysetId = params['studysetId'];
      this.studysetURL = `studyset/${this.studysetId}`;
    });

    this.studysetService.getUserCards(this.studysetId!)
      .pipe(first())
      .subscribe({
        next: (data: CardsWithStudyset) => {
          this.dataResponse = data;
          this.isLoading = false;
          this.cards = [...this.dataResponse.cards];
          this.baseCards = [...this.dataResponse.cards];
        },
        error: (error: any) => {
          this.router.navigate(['/dashboard']).then(() => {
            console.log(error);
          });
        }
      });
  }

  public shuffle() {
    setTimeout(() => { // для того, чтобы успело сменится состояние
      if (this.isShuffled) {
        this.cards = this.flashcardService.shuffleCards(this.cards!);
      } else {
          this.cards = [...this.dataResponse!.cards];
      }
    }, 1);
  }

  public flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  public switchId(method: 'left-arrow' | 'right-arrow') {
    switch(method) {
      case 'left-arrow':
        if (this.currentId > 1) {
          this.currentId = this.currentId - 1;
          this.isFlipped = false;
          break;
        }
        if (this.currentId === 1) {
          this.currentId = this.dataResponse!.cards.length;
          this.isFlipped = false;
          break;
        }
        break;
      case 'right-arrow':
        if (this.currentId < this.dataResponse!.cards.length) {
          this.currentId = this.currentId + 1;
          this.isFlipped = false;
          break;
        }
        if (this.currentId === this.dataResponse!.cards.length) {
          this.currentId = 1;
          this.isFlipped = false;
          break;
        }
        break;
    }
  }
}

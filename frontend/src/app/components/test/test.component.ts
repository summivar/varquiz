import { Component } from '@angular/core';
import { CardsWithStudyset } from '@app/components/studyset/types';
import { CardService, HelperService, StudysetService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Card } from '@app/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
})
export class TestComponent {
  dataResponse?: CardsWithStudyset;
  cards!: Card[];
  currentId: number = 1;
  differences?: SafeHtml;
  currentText?: string;
  studysetId?: string;
  studysetURL?: string;
  isLoading: boolean = false;
  isChecking: boolean = false;
  isCorrect: boolean = true;

  constructor(
    private studysetService: StudysetService,
    private route: ActivatedRoute,
    private router: Router,
    private cardService: CardService,
    private helperService: HelperService,
    private sanitizer: DomSanitizer,
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
          this.cards = this.cardService.shuffleCards([...this.dataResponse.cards]);
          this.isLoading = false;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']).then(() => {
            console.log(error);
          });
        }
      });
  }

  public checkTerm() {
    this.isChecking = true;
    this.isCorrect = true;
    this.differences = '';
    const needTerm = (this.cards[this.currentId - 1].term!).toLowerCase().trim();
    const userAnswer = (this.currentText!).toLowerCase().trim();

    let differences = '';

    for (let i = 0; i < Math.min(needTerm.length, userAnswer.length); i++) {
      if (needTerm[i] !== userAnswer[i]) {
        differences += '<span style="color: red;">' + userAnswer[i] + '</span>';
        this.isCorrect = false;
      } else {
        differences += userAnswer[i];
      }
    }

    if (needTerm.length > userAnswer.length) {
      differences += `<span style="color: red">${needTerm.substring(userAnswer.length)}</span>`;
      this.isCorrect = false;
    } else if (userAnswer.length > needTerm.length) {
      this.isCorrect = false;
      differences += `<span style="color: red">${userAnswer.substring(needTerm.length)}</span>`;
    }

    this.differences = this.sanitizer.bypassSecurityTrustHtml('Your answer: ' + differences.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')); // Title Case

    this.isChecking = false;

    if (this.isCorrect) {
      setTimeout(() => {
        this.differences = '';
        this.currentText = '';
        if (this.currentId < this.cards.length) {
          this.currentId = this.currentId + 1;
          return;
        }
        if (this.currentId === this.cards.length) {
          this.currentId = 1;
          return;
        }
      }, 500);
    }
  }
}

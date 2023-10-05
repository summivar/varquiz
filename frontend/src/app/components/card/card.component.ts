import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudysetService } from '@app/services';
import { first } from 'rxjs';
import { Card } from '@app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  editcardForm!: FormGroup;
  card?: Card;
  studysetId?: string;
  studysetURL?: string;
  submitted = false;
  cardId?: string;
  isLoadingForm: boolean = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private studysetService: StudysetService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.studysetId = params['studysetId'];
      this.studysetURL = `studyset/${this.studysetId}`;
    });

    this.route.params.subscribe(params => {
      this.cardId = params['cardId'];
    });

    this.studysetService.getUserCardById(this.studysetId!, this.cardId!)
      .pipe(first())
      .subscribe({
        next: (data: Card) => {
          this.card = data;
          this.changeInputValue('term', data.term!);
          this.changeInputValue('definition', data.definition!);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  ngOnInit() {
    this.editcardForm = this.formBuilder.group({
      term: ['', [Validators.required]],
      definition: ['', [Validators.required]]
    });
  }

  get f() {
    return this.editcardForm.controls;
  }

  public changeInputValue(controlName: 'term' | 'definition', newValue: string) {
    const control = this.editcardForm.get(controlName);

    if (control) {
      control.setValue(newValue);
    }
  }

  public onSubmit() {
    this.submitted = true;

    if (this.editcardForm.invalid) {
      return;
    }

    this.error = '';
    this.isLoadingForm = true;

    this.studysetService.editCard(this.studysetId!, this.cardId!, this.f['term'].value, this.f['definition'].value)
      .pipe(first())
      .subscribe({
        next: (data: Card) => {
          this.isLoadingForm = false;
          this.card = data;

          this.changeInputValue('term', data.term!);
          this.changeInputValue('definition', data.definition!);
          this.submitted = false;
        },
        error: (error: any) => {
          this.error = JSON.stringify(error.message, null, 2);
          this.isLoadingForm = false;
        }
      })
  }

  public handleDelete() {
    this.studysetService.deleteCardFromStudyset(this.studysetId!, this.cardId!)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['studyset', this.studysetId]);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
  }
}

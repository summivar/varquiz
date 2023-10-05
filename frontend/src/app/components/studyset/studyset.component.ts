import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, Studyset } from '@app/models';
import { StudysetService } from '@app/services';
import { first } from 'rxjs';
import { CardsWithStudyset } from '@app/components/studyset/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-studyset',
  templateUrl: './studyset.component.html',
  styleUrls: ['./studyset.component.scss']
})
export class StudysetComponent implements OnInit {
  addcardForm!: FormGroup;
  editstudysetForm!: FormGroup;
  dataResponse?: CardsWithStudyset;
  studysetId?: string;
  submitted: boolean = false;
  submittedEdit: boolean = false;
  isLoading: boolean = false;
  isLoadingForm: boolean = false;
  isLoadingFormEdit: boolean = false;
  error?: string;
  errorEdit?: string;

  constructor(
    private studysetService: StudysetService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.studysetId = params['studysetId'];
    });

    this.studysetService.getUserCards(this.studysetId!)
      .pipe(first())
      .subscribe({
        next: (data: CardsWithStudyset) => {
          this.dataResponse = data;
          this.isLoading = false;

          this.changeInputValue('title', data.studyset.title!);
          this.changeInputValue("description", data.studyset.description!);
        },
        error: (error) => {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  ngOnInit() {
    this.addcardForm = this.formBuilder.group({
      term: ['', [Validators.required, Validators.maxLength(32)]],
      definition: ['', [Validators.required, Validators.maxLength(256)]]
    });
    this.editstudysetForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['']
    });
  }

  get f() {
    return this.addcardForm.controls;
  }

  get fEdit() {
    return this.editstudysetForm.controls;
  }

  public changeInputValue(controlName: 'term' | 'definition' | 'title' | 'description', newValue: string) {
     const control = this.editstudysetForm.get(controlName);

     if (control) {
       control.setValue(newValue);
     }
  }

  public onSubmit() {
    this.submitted = true;

    if (this.addcardForm.invalid) {
      return;
    }

    this.error = '';
    this.isLoadingForm = true;
    this.studysetService.addCardToStudyset(this.studysetId!, this.f['term'].value, this.f['definition'].value)
      .pipe(first())
      .subscribe({
        next: (data: Card) => {
          this.dataResponse?.cards.push(data);
          this.isLoadingForm = false;

          this.addcardForm.reset();
          this.submitted = false;
        },
        error: (error: any) => {
          this.error = JSON.stringify(error.message, null, 2);
          this.isLoadingForm = false;
        }
      });
  }

  public onSubmitEdit() {
    this.submittedEdit = true;

    if (this.editstudysetForm.invalid) {
      return;
    }

    if (!this.fEdit['title'].value && !this.fEdit['description'].value) {
      return;
    }

    this.errorEdit = '';
    this.isLoadingFormEdit = true;
    this.studysetService.editStudyset(this.studysetId!, this.fEdit['title'].value, this.fEdit['description'].value)
      .pipe(first())
      .subscribe({
        next: (data: Studyset) => {
          this.dataResponse!.studyset = data;
          this.isLoadingFormEdit = false;

          this.changeInputValue('title', data.title!);
          this.changeInputValue("description", data.description!);
          this.submittedEdit = false;
        },
        error: (error: any) => {
          this.error = JSON.stringify(error.message, null, 2);
          this.isLoadingFormEdit = false;
        }
      });
  }

  public handleDelete() {
    this.studysetService.deleteCard(this.studysetId!)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['dashboard']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }
}

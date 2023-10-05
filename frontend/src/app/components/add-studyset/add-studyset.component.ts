import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudysetService } from '@app/services';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-studyset',
  templateUrl: './add-studyset.component.html',
})
export class AddStudysetComponent implements OnInit {
  addstudysetForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studysetService: StudysetService
  ) {
  }

  ngOnInit() {
    this.addstudysetForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.maxLength(32)]]
    });
  }

  get f() {
    return this.addstudysetForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addstudysetForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.studysetService.addStudyset(this.f['title'].value, this.f['description'].value)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          console.log(JSON.stringify(data, null, 2));
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.error = error.message?.message;
          this.loading = false;
        }
      })
  }
}

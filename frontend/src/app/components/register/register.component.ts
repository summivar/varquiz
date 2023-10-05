import { Component, OnInit } from '@angular/core';
import { AuthService, StorageService } from '@app/services';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { SigninData } from '@app/components/login/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private authService: AuthService
  ) {
    if (authService.isAuth) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), this.matchPasswordValidator('confirmPassword')]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator('password')]]
    });
  }

  matchPasswordValidator(controlNameToMatch: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matchingControl = control.root.get(controlNameToMatch);

      if (matchingControl && control.value !== matchingControl.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.authService.register(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (data: SigninData) => {
          this.storage.saveUser(data);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (error: any) => {
          if (error.toString().includes('400 Bad Request')) {
            this.router.navigate(['signin'])
          }
          this.error = error.message;
          this.loading = false;
        }
      });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '@app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(public authService: AuthService, private router: Router) {
    if (authService.isAuth) {
      this.router.navigate(['dashboard']);
    }
  }
}

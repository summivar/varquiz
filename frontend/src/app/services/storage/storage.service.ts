import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const USER_KEY = 'auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private router: Router,
  ) {
  }

  public logout(): void {
    window.localStorage.removeItem(USER_KEY);
    this.router.navigate(['/signin']);
  }

  public saveUser(user: any): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

}

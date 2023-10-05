import { Injectable } from '@angular/core';
import { AuthService } from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) {
  }

  public getUser() {
    const userResponse = this.authService.userData;
    return userResponse;
  }
}

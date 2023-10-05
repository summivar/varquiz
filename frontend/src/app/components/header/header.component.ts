import { Component } from '@angular/core';
import { AuthService, StorageService, UserService } from '@app/services';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private storage: StorageService, public authService: AuthService, public userService: UserService) {
  }

  logout() {
    this.storage.logout();
  }
}

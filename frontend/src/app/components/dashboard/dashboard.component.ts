import { Component } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { AuthService, StudysetService } from '@app/services';
import { first } from 'rxjs';
import { Studyset } from '@app/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isLoading: boolean = false;
  studysets?: Studyset[];
  error?: string;

  constructor(private studysetService: StudysetService, public authService: AuthService) {
    this.isLoading = true;
    this.studysetService.getUserStudysets()
      .pipe(first())
      .subscribe({
        next: (data: Studyset[]) => {
          this.studysets = data;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.error = JSON.stringify(error.message, null, 2);
          console.log(error);
        }
      });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddStudysetComponent,
  CardComponent,
  DashboardComponent,
  FlashcardComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  StudysetComponent,
  TestComponent
} from '@app/components';
import { AuthGuard } from '@app/guards';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'addstudyset', component: AddStudysetComponent, canActivate: [AuthGuard]},

  {path: 'studyset/:studysetId', component: StudysetComponent, canActivate: [AuthGuard]},
  {path: 'studyset/:studysetId/card/:cardId', component: CardComponent, canActivate: [AuthGuard]},

  {path: 'studyset/:studysetId/flashcard', component: FlashcardComponent, canActivate: [AuthGuard]},
  {path: 'studyset/:studysetId/test', component: TestComponent, canActivate: [AuthGuard]},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import {
  AddStudysetComponent,
  CardComponent,
  DashboardComponent,
  FlashcardComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  StudysetComponent,
  TestComponent
} from '@app/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  declarations: [
    AddStudysetComponent,
    CardComponent,
    DashboardComponent,
    FlashcardComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StudysetComponent,
    TestComponent
  ],
  imports: [
    PipesModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    BrowserModule,
    CommonModule
  ],
  exports: [
    AddStudysetComponent,
    CardComponent,
    DashboardComponent,
    FlashcardComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StudysetComponent,
    TestComponent
  ]
})
export class ComponentsModule {
}

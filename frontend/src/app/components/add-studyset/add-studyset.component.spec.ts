import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudysetComponent } from './add-studyset.component';

describe('AddStudysetComponent', () => {
  let component: AddStudysetComponent;
  let fixture: ComponentFixture<AddStudysetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudysetComponent]
    });
    fixture = TestBed.createComponent(AddStudysetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

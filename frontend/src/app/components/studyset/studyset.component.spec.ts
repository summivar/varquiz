import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudysetComponent } from './studyset.component';

describe('StudysetComponent', () => {
  let component: StudysetComponent;
  let fixture: ComponentFixture<StudysetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudysetComponent]
    });
    fixture = TestBed.createComponent(StudysetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

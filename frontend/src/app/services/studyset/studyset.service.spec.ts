import { TestBed } from '@angular/core/testing';

import { StudysetService } from '@app/services';

describe('StudysetService', () => {
  let service: StudysetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudysetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

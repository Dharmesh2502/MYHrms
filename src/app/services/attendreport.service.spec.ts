import { TestBed } from '@angular/core/testing';

import { AttendreportService } from './attendreport.service';

describe('AttendreportService', () => {
  let service: AttendreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MisReportService } from './mis-report.service';

describe('MisReportService', () => {
  let service: MisReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MothlyReportServiceService } from './mothly-report-service.service';

describe('MothlyReportServiceService', () => {
  let service: MothlyReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MothlyReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

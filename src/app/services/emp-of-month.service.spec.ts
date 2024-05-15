import { TestBed } from '@angular/core/testing';

import { EmpOfMonthService } from './emp-of-month.service';

describe('EmpOfMonthService', () => {
  let service: EmpOfMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpOfMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

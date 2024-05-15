import { TestBed } from '@angular/core/testing';

import { NewempjoinService } from './newempjoin.service';

describe('NewempjoinService', () => {
  let service: NewempjoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewempjoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

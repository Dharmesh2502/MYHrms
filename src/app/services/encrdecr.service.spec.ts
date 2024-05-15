import { TestBed } from '@angular/core/testing';

import { EncrdecrService } from './encrdecr.service';

describe('EncrdecrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncrdecrService = TestBed.get(EncrdecrService);
    expect(service).toBeTruthy();
  });
});

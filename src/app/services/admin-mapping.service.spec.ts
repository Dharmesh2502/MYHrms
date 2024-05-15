import { TestBed } from '@angular/core/testing';

import { AdminMappingService } from './admin-mapping.service';

describe('AdminMappingService', () => {
  let service: AdminMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

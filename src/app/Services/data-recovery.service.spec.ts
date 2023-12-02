import { TestBed } from '@angular/core/testing';

import { DataRecoveryService } from './data-recovery.service';

describe('DataRecoveryService', () => {
  let service: DataRecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

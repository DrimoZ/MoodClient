import { TestBed } from '@angular/core/testing';

import { ModalBusService } from './modal-bus.service';

describe('ModalBusService', () => {
  let service: ModalBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

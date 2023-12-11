import { TestBed } from '@angular/core/testing';

import { BehaviorEventBusService } from './behavior-event-bus.service';

describe('BehaviorEventBusService', () => {
  let service: BehaviorEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviorEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

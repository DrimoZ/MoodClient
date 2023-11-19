import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionRefusedComponent } from './connection-refused.component';

describe('ConnectionRefusedComponent', () => {
  let component: ConnectionRefusedComponent;
  let fixture: ComponentFixture<ConnectionRefusedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionRefusedComponent]
    });
    fixture = TestBed.createComponent(ConnectionRefusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

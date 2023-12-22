import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionValidationModalComponent } from './action-validation-modal.component';

describe('DeleteAccountModalComponent', () => {
  let component: ActionValidationModalComponent;
  let fixture: ComponentFixture<ActionValidationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionValidationModalComponent]
    });
    fixture = TestBed.createComponent(ActionValidationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

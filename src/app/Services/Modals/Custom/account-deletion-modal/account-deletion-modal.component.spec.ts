import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeletionModalComponent } from './account-deletion-modal.component';

describe('DeleteAccountModalComponent', () => {
  let component: AccountDeletionModalComponent;
  let fixture: ComponentFixture<AccountDeletionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDeletionModalComponent]
    });
    fixture = TestBed.createComponent(AccountDeletionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

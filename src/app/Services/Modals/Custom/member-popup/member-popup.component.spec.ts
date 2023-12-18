import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPopupComponent } from './member-popup.component';

describe('MemberPopupComponent', () => {
  let component: MemberPopupComponent;
  let fixture: ComponentFixture<MemberPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberPopupComponent]
    });
    fixture = TestBed.createComponent(MemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

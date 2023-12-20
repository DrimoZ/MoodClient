import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMembersInfoModalComponent } from './group-members-info-modal.component';

describe('MemberPopupComponent', () => {
  let component: GroupMembersInfoModalComponent;
  let fixture: ComponentFixture<GroupMembersInfoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupMembersInfoModalComponent]
    });
    fixture = TestBed.createComponent(GroupMembersInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

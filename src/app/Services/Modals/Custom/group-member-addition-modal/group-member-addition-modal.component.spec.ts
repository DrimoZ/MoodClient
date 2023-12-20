import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberAdditionModalComponent } from './group-member-addition-modal.component';

describe('AddMemberPopupComponent', () => {
  let component: GroupMemberAdditionModalComponent;
  let fixture: ComponentFixture<GroupMemberAdditionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupMemberAdditionModalComponent]
    });
    fixture = TestBed.createComponent(GroupMemberAdditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

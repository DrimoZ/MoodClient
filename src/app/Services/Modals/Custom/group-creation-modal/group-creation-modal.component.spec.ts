import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreationModalComponent } from './group-creation-modal.component';

describe('PopupComponent', () => {
  let component: GroupCreationModalComponent;
  let fixture: ComponentFixture<GroupCreationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCreationModalComponent]
    });
    fixture = TestBed.createComponent(GroupCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

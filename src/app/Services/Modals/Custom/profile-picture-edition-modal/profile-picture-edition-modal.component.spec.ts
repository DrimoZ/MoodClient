import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureEditionModalComponent } from './profile-picture-edition-modal.component';

describe('ProfilePictureModalComponent', () => {
  let component: ProfilePictureEditionModalComponent;
  let fixture: ComponentFixture<ProfilePictureEditionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePictureEditionModalComponent]
    });
    fixture = TestBed.createComponent(ProfilePictureEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

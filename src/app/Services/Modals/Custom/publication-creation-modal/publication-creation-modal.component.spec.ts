import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationCreationModalComponent } from './publication-creation-modal.component';

describe('CreatePublicationComponent', () => {
  let component: PublicationCreationModalComponent;
  let fixture: ComponentFixture<PublicationCreationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationCreationModalComponent]
    });
    fixture = TestBed.createComponent(PublicationCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationDetailModalComponent } from './publication-detail-modal.component';

describe('PublicationDetailModalComponent', () => {
  let component: PublicationDetailModalComponent;
  let fixture: ComponentFixture<PublicationDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationDetailModalComponent]
    });
    fixture = TestBed.createComponent(PublicationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

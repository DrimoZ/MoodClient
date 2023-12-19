import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicationComponent } from './create-publication.component';

describe('CreatePublicationComponent', () => {
  let component: CreatePublicationComponent;
  let fixture: ComponentFixture<CreatePublicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePublicationComponent]
    });
    fixture = TestBed.createComponent(CreatePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

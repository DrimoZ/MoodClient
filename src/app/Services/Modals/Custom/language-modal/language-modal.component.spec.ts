import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageModalComponent } from './language-modal.component';

describe('LanguageModalComponent', () => {
  let component: LanguageModalComponent;
  let fixture: ComponentFixture<LanguageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageModalComponent]
    });
    fixture = TestBed.createComponent(LanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

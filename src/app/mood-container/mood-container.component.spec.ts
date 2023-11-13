import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodContainerComponent } from './mood-container.component';

describe('MoodContainerComponent', () => {
  let component: MoodContainerComponent;
  let fixture: ComponentFixture<MoodContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoodContainerComponent]
    });
    fixture = TestBed.createComponent(MoodContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

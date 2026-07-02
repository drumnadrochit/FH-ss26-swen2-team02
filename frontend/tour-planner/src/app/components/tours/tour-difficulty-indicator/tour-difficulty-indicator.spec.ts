import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDifficultyIndicator } from './tour-difficulty-indicator';

describe('TourDifficultyIndicator', () => {
  let component: TourDifficultyIndicator;
  let fixture: ComponentFixture<TourDifficultyIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourDifficultyIndicator],
    }).compileComponents();

    fixture = TestBed.createComponent(TourDifficultyIndicator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

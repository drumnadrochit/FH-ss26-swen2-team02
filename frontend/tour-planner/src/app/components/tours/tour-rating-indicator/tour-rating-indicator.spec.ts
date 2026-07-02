import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourRatingIndicator } from './tour-rating-indicator';

describe('TourRatingIndicator', () => {
  let component: TourRatingIndicator;
  let fixture: ComponentFixture<TourRatingIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourRatingIndicator],
    }).compileComponents();

    fixture = TestBed.createComponent(TourRatingIndicator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

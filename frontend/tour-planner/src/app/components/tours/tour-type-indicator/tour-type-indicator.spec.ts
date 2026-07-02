import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourTypeIndicator } from './tour-type-indicator';

describe('TourTypeIndicator', () => {
  let component: TourTypeIndicator;
  let fixture: ComponentFixture<TourTypeIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourTypeIndicator],
    }).compileComponents();

    fixture = TestBed.createComponent(TourTypeIndicator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

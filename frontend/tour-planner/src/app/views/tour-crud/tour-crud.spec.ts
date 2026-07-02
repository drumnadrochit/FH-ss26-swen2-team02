import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourCrud } from './tour-crud';

describe('TourCrud', () => {
  let component: TourCrud;
  let fixture: ComponentFixture<TourCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourCrud],
    }).compileComponents();

    fixture = TestBed.createComponent(TourCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

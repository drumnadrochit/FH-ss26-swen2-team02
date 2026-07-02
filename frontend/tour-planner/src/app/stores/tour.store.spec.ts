import { TestBed } from '@angular/core/testing';

import { TourStore } from './tour.store';

describe('TourStore', () => {
  let service: TourStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

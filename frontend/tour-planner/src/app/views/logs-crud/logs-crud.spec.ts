import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsCRUD } from './logs-crud';

describe('LogsCrud', () => {
  let component: LogsCRUD;
  let fixture: ComponentFixture<LogsCRUD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsCRUD],
    }).compileComponents();

    fixture = TestBed.createComponent(LogsCRUD);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

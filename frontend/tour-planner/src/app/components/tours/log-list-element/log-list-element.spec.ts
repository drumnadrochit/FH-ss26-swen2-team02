import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListElement } from './log-list-element';

describe('LogListElement', () => {
  let component: LogListElement;
  let fixture: ComponentFixture<LogListElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogListElement],
    }).compileComponents();

    fixture = TestBed.createComponent(LogListElement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

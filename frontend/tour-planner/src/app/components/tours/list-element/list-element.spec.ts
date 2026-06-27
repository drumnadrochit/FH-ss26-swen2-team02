import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElement } from './list-element';

describe('ListElement', () => {
  let component: ListElement;
  let fixture: ComponentFixture<ListElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListElement],
    }).compileComponents();

    fixture = TestBed.createComponent(ListElement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButton } from './input-button';

describe('InputButton', () => {
  let component: InputButton;
  let fixture: ComponentFixture<InputButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputButton],
    }).compileComponents();

    fixture = TestBed.createComponent(InputButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRegular } from './button-regular';

describe('ButtonRegular', () => {
  let component: ButtonRegular;
  let fixture: ComponentFixture<ButtonRegular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRegular],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonRegular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesBar } from './detalles-bar';

describe('TareasHeader', () => {
  let component: DetallesBar;
  let fixture: ComponentFixture<DetallesBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesBar],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

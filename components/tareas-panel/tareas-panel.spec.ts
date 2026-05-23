import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasPanel } from './tareas-panel';

describe('TareasPanel', () => {
  let component: TareasPanel;
  let fixture: ComponentFixture<TareasPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(TareasPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

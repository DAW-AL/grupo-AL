import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPanel } from './editar-panel';

describe('EditarPanel', () => {
  let component: EditarPanel;
  let fixture: ComponentFixture<EditarPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

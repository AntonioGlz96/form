import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloTalla } from './modelo-talla';

describe('ModeloTalla', () => {
  let component: ModeloTalla;
  let fixture: ComponentFixture<ModeloTalla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeloTalla]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeloTalla);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

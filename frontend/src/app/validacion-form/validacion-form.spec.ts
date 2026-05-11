import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionForm } from './validacion-form';

describe('ValidacionForm', () => {
  let component: ValidacionForm;
  let fixture: ComponentFixture<ValidacionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

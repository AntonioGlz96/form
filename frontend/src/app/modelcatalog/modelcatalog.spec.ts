import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modelcatalog } from './modelcatalog';

describe('Modelcatalog', () => {
  let component: Modelcatalog;
  let fixture: ComponentFixture<Modelcatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modelcatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modelcatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

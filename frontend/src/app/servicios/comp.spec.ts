import { TestBed } from '@angular/core/testing';

import { Comp } from './comp';

describe('Comp', () => {
  let service: Comp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

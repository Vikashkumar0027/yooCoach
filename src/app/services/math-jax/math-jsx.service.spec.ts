import { TestBed } from '@angular/core/testing';

import { MathJsxService } from './math-jsx.service';

describe('MathJsxService', () => {
  let service: MathJsxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathJsxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TokencheckerService } from './tokenchecker.service';

describe('TokencheckerService', () => {
  let service: TokencheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokencheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

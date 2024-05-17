import { TestBed } from '@angular/core/testing';

import { AuthUidService } from './auth-uid.service';

describe('AuthUidService', () => {
  let service: AuthUidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

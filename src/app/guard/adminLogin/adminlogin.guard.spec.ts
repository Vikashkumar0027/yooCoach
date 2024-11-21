import { TestBed } from '@angular/core/testing';

import { AdminloginGuard } from './adminlogin.guard';

describe('AdminloginGuard', () => {
  let guard: AdminloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VdobannerService } from './vdobanner.service';

describe('VdobannerService', () => {
  let service: VdobannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VdobannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SamplepaperService } from './samplepaper.service';

describe('SamplepaperService', () => {
  let service: SamplepaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamplepaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

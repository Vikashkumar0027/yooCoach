import { TestBed } from '@angular/core/testing';

import { BuyRecommondedCourseService } from './buy-recommonded-course.service';

describe('BuyRecommondedCourseService', () => {
  let service: BuyRecommondedCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyRecommondedCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

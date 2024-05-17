import { TestBed } from '@angular/core/testing';

import { QuizlistService } from './quizlist.service';

describe('QuizlistService', () => {
  let service: QuizlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

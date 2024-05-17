import { TestBed } from '@angular/core/testing';

import { QizQuestionService } from './qiz-question.service';

describe('QizQuestionService', () => {
  let service: QizQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QizQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

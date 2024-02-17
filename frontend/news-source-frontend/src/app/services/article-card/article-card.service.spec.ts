import { TestBed } from '@angular/core/testing';

import { ArticleCardService } from './article-card.service';

describe('ArticleCardService', () => {
  let service: ArticleCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

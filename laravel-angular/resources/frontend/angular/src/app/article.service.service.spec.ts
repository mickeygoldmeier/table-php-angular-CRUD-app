import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service.service';

describe('Article.ServiceService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
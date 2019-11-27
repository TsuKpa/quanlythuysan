import { TestBed } from '@angular/core/testing';

import { ChebienService } from './chebien.service';

describe('ChebienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChebienService = TestBed.get(ChebienService);
    expect(service).toBeTruthy();
  });
});

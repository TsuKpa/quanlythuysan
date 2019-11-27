import { TestBed } from '@angular/core/testing';

import { BanleService } from './banle.service';

describe('BanleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BanleService = TestBed.get(BanleService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PhanphoiService } from './phanphoi.service';

describe('PhanphoiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhanphoiService = TestBed.get(PhanphoiService);
    expect(service).toBeTruthy();
  });
});

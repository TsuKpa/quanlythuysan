import { TestBed } from '@angular/core/testing';

import { NuoinlService } from './nuoinl.service';

describe('NuoinlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NuoinlService = TestBed.get(NuoinlService);
    expect(service).toBeTruthy();
  });
});

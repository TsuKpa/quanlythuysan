import { TestBed } from '@angular/core/testing';

import { NuoigiongService } from './nuoigiong.service';

describe('NuoigiongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NuoigiongService = TestBed.get(NuoigiongService);
    expect(service).toBeTruthy();
  });
});

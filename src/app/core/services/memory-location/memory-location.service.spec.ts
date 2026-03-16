/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoryLocationService } from './memory-location.service';

describe('Service: MemoryLocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryLocationService]
    });
  });

  it('should ...', inject([MemoryLocationService], (service: MemoryLocationService) => {
    expect(service).toBeTruthy();
  }));
});

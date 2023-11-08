/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebWorkesTestService } from './web-workes-test.service';

describe('Service: WebWorkesTest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebWorkesTestService]
    });
  });

  it('should ...', inject([WebWorkesTestService], (service: WebWorkesTestService) => {
    expect(service).toBeTruthy();
  }));
});

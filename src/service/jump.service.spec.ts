import { TestBed, inject } from '@angular/core/testing';

import { JumpService } from './jump.service';

describe('JumpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JumpService]
    });
  });

  it('should be created', inject([JumpService], (service: JumpService) => {
    expect(service).toBeTruthy();
  }));
});

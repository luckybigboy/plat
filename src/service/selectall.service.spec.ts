import { TestBed, inject } from '@angular/core/testing';

import { SelectallService } from './selectall.service';

describe('SelectallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectallService]
    });
  });

  it('should be created', inject([SelectallService], (service: SelectallService) => {
    expect(service).toBeTruthy();
  }));
});

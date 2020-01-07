import { TestBed, inject } from '@angular/core/testing';

import { GetExportServiceService } from './get-export.service.service';

describe('GetExport.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetExportServiceService]
    });
  });

  it('should be created', inject([GetExportServiceService], (service: GetExportServiceService) => {
    expect(service).toBeTruthy();
  }));
});

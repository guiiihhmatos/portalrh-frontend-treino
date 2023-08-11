import { TestBed } from '@angular/core/testing';

import { ValeTransporteService } from './vale-transporte.service';

describe('ValeTransporteService', () => {
  let service: ValeTransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValeTransporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

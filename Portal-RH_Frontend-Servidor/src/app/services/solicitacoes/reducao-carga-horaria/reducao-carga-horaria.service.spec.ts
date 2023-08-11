import { TestBed } from '@angular/core/testing';

import { ReducaoCargaHorariaService } from './reducao-carga-horaria.service';

describe('ReducaoCargaHorariaService', () => {
  let service: ReducaoCargaHorariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReducaoCargaHorariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

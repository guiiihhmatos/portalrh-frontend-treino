import { TestBed } from '@angular/core/testing';

import { LicencaSemVencimentoService } from './licenca-sem-vencimento.service';

describe('LicencaSemVencimentoService', () => {
  let service: LicencaSemVencimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicencaSemVencimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

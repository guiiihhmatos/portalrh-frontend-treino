import { TestBed } from '@angular/core/testing';

import { RequisicaoDeclaracaoService } from './requisicao-declaracao.service';

describe('RequisicaoDeclaracaoService', () => {
  let service: RequisicaoDeclaracaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisicaoDeclaracaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

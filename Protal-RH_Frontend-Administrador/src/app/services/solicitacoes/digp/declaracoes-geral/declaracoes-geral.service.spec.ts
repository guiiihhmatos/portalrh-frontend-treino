import { TestBed } from '@angular/core/testing';

import { DeclaracoesGeralService } from './declaracoes-geral.service';

describe('DeclaracoesGeralService', () => {
  let service: DeclaracoesGeralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclaracoesGeralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

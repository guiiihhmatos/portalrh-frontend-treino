import { TestBed } from '@angular/core/testing';

import { DeclaracaoService } from './declaracao.service';

describe('DeclaracaoService', () => {
  let service: DeclaracaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclaracaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

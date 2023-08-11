import { TestBed } from '@angular/core/testing';

import { ContagemQuinquenioService } from './contagem-quinquenio.service';

describe('ContagemQuinquenioService', () => {
  let service: ContagemQuinquenioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContagemQuinquenioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InfoServidorService } from './info-servidor.service';

describe('InfoServidorService', () => {
  let service: InfoServidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoServidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

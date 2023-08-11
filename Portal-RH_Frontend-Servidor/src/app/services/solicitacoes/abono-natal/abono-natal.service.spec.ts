import { TestBed } from '@angular/core/testing';

import { AbonoNatalService } from './abono-natal.service';

describe('AbonoNatalService', () => {
  let service: AbonoNatalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonoNatalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

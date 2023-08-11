import { TestBed } from '@angular/core/testing';

import { NotActivateGuard } from './not-activate.guard';

describe('NotActivateGuard', () => {
  let guard: NotActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

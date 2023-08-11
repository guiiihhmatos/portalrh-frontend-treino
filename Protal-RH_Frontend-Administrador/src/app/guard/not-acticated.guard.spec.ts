import { TestBed } from '@angular/core/testing';

import { NotActicatedGuard } from './not-acticated.guard';

describe('NotActicatedGuard', () => {
  let guard: NotActicatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotActicatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

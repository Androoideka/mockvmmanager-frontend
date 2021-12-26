import { TestBed } from '@angular/core/testing';

import { ReadGuard } from './read.guard';

describe('ReadGuard', () => {
  let guard: ReadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

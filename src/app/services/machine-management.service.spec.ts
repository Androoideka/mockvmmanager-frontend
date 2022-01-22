import { TestBed } from '@angular/core/testing';

import { MachineManagementService } from './machine-management.service';

describe('MachineManagementService', () => {
  let service: MachineManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AutentFirebaseService } from './autent-firebase.service';

describe('AutentFirebaseService', () => {
  let service: AutentFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

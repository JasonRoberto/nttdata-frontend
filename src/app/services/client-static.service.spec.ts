import { TestBed } from '@angular/core/testing';

import { ClientStaticService } from './client-static.service';

describe('ClientStaticService', () => {
  let service: ClientStaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientStaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

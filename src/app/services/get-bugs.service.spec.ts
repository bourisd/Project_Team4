import { TestBed } from '@angular/core/testing';

import { GetBugsService } from './get-bugs.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('GetBugsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: GetBugsService = TestBed.get(GetBugsService);
    expect(service).toBeTruthy();
  });
});

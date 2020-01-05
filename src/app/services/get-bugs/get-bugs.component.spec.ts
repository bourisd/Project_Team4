import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBugsComponent } from './get-bugs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';

describe('GetBugsComponent', () => {
  let component: GetBugsComponent;
  let fixture: ComponentFixture<GetBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBugsComponent, AngularFontAwesomeComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

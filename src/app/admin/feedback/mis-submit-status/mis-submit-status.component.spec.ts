import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSubmitStatusComponent } from './mis-submit-status.component';

describe('MisSubmitStatusComponent', () => {
  let component: MisSubmitStatusComponent;
  let fixture: ComponentFixture<MisSubmitStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisSubmitStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisSubmitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

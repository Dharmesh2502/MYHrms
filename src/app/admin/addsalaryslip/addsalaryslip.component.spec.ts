import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsalaryslipComponent } from './addsalaryslip.component';

describe('AddsalaryslipComponent', () => {
  let component: AddsalaryslipComponent;
  let fixture: ComponentFixture<AddsalaryslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsalaryslipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsalaryslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOfMonthComponent } from './employee-of-month.component';

describe('EmployeeOfMonthComponent', () => {
  let component: EmployeeOfMonthComponent;
  let fixture: ComponentFixture<EmployeeOfMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOfMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOfMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

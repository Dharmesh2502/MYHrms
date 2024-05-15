import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMonthComponent } from './emp-month.component';

describe('EmpMonthComponent', () => {
  let component: EmpMonthComponent;
  let fixture: ComponentFixture<EmpMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

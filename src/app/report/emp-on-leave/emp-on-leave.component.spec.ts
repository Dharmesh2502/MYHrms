import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpOnLeaveComponent } from './emp-on-leave.component';

describe('EmpOnLeaveComponent', () => {
  let component: EmpOnLeaveComponent;
  let fixture: ComponentFixture<EmpOnLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpOnLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpOnLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

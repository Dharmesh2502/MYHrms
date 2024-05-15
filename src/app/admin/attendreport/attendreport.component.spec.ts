import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendreportComponent } from './attendreport.component';

describe('AttendreportComponent', () => {
  let component: AttendreportComponent;
  let fixture: ComponentFixture<AttendreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReportComponent } from './mis-report.component';

describe('MisReportComponent', () => {
  let component: MisReportComponent;
  let fixture: ComponentFixture<MisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

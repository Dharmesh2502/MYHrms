import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDailyTaskSheetComponent } from './admin-daily-task-sheet.component';

describe('AdminDailyTaskSheetComponent', () => {
  let component: AdminDailyTaskSheetComponent;
  let fixture: ComponentFixture<AdminDailyTaskSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDailyTaskSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDailyTaskSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

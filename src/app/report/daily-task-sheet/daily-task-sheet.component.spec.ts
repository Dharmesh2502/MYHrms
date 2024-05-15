import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTaskSheetComponent } from './daily-task-sheet.component';

describe('DailyTaskSheetComponent', () => {
  let component: DailyTaskSheetComponent;
  let fixture: ComponentFixture<DailyTaskSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTaskSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTaskSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

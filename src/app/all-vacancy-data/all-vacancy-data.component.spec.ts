import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVacancyDataComponent } from './all-vacancy-data.component';

describe('AllVacancyDataComponent', () => {
  let component: AllVacancyDataComponent;
  let fixture: ComponentFixture<AllVacancyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVacancyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVacancyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

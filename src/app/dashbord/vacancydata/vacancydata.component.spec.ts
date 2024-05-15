import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancydataComponent } from './vacancydata.component';

describe('VacancydataComponent', () => {
  let component: VacancydataComponent;
  let fixture: ComponentFixture<VacancydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancydataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceformComponent } from './grievanceform.component';

describe('GrievanceformComponent', () => {
  let component: GrievanceformComponent;
  let fixture: ComponentFixture<GrievanceformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrievanceformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievanceformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

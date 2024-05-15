import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievancelistComponent } from './grievancelist.component';

describe('GrievancelistComponent', () => {
  let component: GrievancelistComponent;
  let fixture: ComponentFixture<GrievancelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrievancelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

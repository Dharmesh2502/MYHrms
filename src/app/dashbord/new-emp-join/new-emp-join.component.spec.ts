import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmpJoinComponent } from './new-emp-join.component';

describe('NewEmpJoinComponent', () => {
  let component: NewEmpJoinComponent;
  let fixture: ComponentFixture<NewEmpJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmpJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmpJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

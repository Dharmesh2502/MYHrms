import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventGalleryComponent } from './add-event-gallery.component';

describe('AddEventGalleryComponent', () => {
  let component: AddEventGalleryComponent;
  let fixture: ComponentFixture<AddEventGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSendMailComponent } from './feedback-send-mail.component';

describe('FeedbackSendMailComponent', () => {
  let component: FeedbackSendMailComponent;
  let fixture: ComponentFixture<FeedbackSendMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackSendMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

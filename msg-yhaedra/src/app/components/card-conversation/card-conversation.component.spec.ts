import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConversationComponent } from './card-conversation.component';

describe('CardConversationComponent', () => {
  let component: CardConversationComponent;
  let fixture: ComponentFixture<CardConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

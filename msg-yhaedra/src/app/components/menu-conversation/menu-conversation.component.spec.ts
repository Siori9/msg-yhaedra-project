import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConversationComponent } from './menu-conversation.component';

describe('MenuConversationComponent', () => {
  let component: MenuConversationComponent;
  let fixture: ComponentFixture<MenuConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

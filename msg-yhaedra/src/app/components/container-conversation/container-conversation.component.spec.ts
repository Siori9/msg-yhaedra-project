import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerConversationComponent } from './container-conversation.component';

describe('ContainerConversationComponent', () => {
  let component: ContainerConversationComponent;
  let fixture: ComponentFixture<ContainerConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

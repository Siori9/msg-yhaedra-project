import {Component, Input} from '@angular/core';
import {NgOptimizedImage, NgStyle} from '@angular/common';

@Component({
  selector: 'app-card-conversation',
  imports: [
    NgOptimizedImage,
    NgStyle
  ],
  templateUrl: './card-conversation.component.html',
  styleUrl: './card-conversation.component.css'
})
export class CardConversationComponent {
  @Input() imgUrl = '';
  @Input() name = '';
  @Input() select = false;
}

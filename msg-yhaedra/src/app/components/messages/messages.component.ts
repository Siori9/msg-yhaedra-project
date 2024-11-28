import {Component, Input, input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  @Input() content: string | undefined
  @Input() author: string | undefined
  @Input() date: string | undefined
  @Input() own: boolean = false;

  ngOnInit(): void {
    if(this.own){
      this.author = "Vous"
    }
  }
}

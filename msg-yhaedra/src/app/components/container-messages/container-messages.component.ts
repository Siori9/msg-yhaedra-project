import {Component, Input, SimpleChanges} from '@angular/core';
import {MessagesComponent} from '../messages/messages.component';
import {ApiService} from '../../api.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-container-messages',
  imports: [
    MessagesComponent,
    NgForOf
  ],
  templateUrl: './container-messages.component.html',
  styleUrl: './container-messages.component.css'
})
export class ContainerMessagesComponent {
  @Input() convId: string | undefined;
  messages: any[] | undefined

  constructor( private apiService: ApiService) {}

  ngOnInit(changes: SimpleChanges): void {
    console.log("ConvId:"+this.convId);
    this.messages = [];
    this.loadMessage();
  }

  loadMessage(){
    if(this.convId != undefined) {
      this.apiService.getMessagesByConversationId(this.convId).subscribe((response) => {
        this.messages = response.map((m) => {
          let message = {content: String, author: String, date: String, own: Boolean}
          message.content = m.contenu;
          message.author = m.expediteur.name;
          message.date = m.createdAt;
          message.own = m.expediteurId === localStorage.getItem('userId');
          return message;
        });
      })
    }
  }
}

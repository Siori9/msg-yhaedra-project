import { Component } from '@angular/core';
import {CardConversationComponent} from '../card-conversation/card-conversation.component';
import {NgForOf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-menu-conversation',
  imports: [
    CardConversationComponent,
    NgForOf,
    FormsModule,
    NgStyle,
  ],
  templateUrl: './menu-conversation.component.html',
  styleUrl: './menu-conversation.component.css'
})
export class MenuConversationComponent {
  data = [
    {imgUrl: "https://i.pinimg.com/236x/73/db/59/73db599ec8e2962ef2f6d0921599df5b.jpg", name: "Lisa", },
    {imgUrl: "https://i.pinimg.com/236x/d3/0c/70/d30c704d6ce701420c32b18d5167426e.jpg", name: "Emily"}
  ]
  idSelect = 0;

  conversations: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    this.apiService.getConversations().subscribe(
      (response) => {
        this.conversations = response;
        console.log('Conversations chargées:', this.conversations);
      },
      (error) => {
        console.error('Erreur lors du chargement des conversations:', error);
      }
    );
  }

  participants = "";
  visiblePopup = false;

  newConversation(){
    this.visiblePopup = true;
  }

  closePopup(){
    this.visiblePopup = false;
  }

  createConversation(): void {
    let listParticipants = this.participants.split(",");
    console.log(listParticipants.toString());
    if (listParticipants.length === 0) {
      return;
    }
    this.apiService.createConversation(listParticipants).subscribe(
      (response) => {
        console.log('Nouvelle conversation :', response);
      },
      (error) => {
        console.error('Erreur lors de la création de la conversation :', error);
      }
    );
  }

}

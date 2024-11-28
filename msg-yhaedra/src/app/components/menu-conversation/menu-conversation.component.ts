import { Component } from '@angular/core';
import {CardConversationComponent} from '../card-conversation/card-conversation.component';
import {NgForOf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../api.service';
import {join} from '@angular/compiler-cli';
import {ActivatedRoute, Router} from '@angular/router';

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

  conversations: any[] = [];
  currentConversationId: string | null = null;

  ngOnInit(): void {
    this.loadConversations();
    this.currentConversationId = this.route.snapshot.paramMap.get('convId');
  }

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

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

  changeConversation(id: string){
    this.currentConversationId = id
    this.router.navigate([`/conversations`,id]);
    let currentUrl = this.router.url;
  }

  selectConversation(conversation: { id: string }): boolean {
    return this.currentConversationId === conversation.id;
  }

  getConversationName(array: Array<{id: string, name: string}>): string {
    return array.filter((p) => p.id != localStorage.getItem("userId") ).map((x) => x.name).join(',').substring(0,10);
  }

  getUrl(array: Array<{id: string, imgUrl: string}>): string {
    return array.filter((u) => u.id != localStorage.getItem("userId"))[0].imgUrl;
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
    if (listParticipants.length === 0) {
      return;
    }
    this.apiService.createConversation(listParticipants).subscribe(
      (response) => {
        console.log('Nouvelle conversation :', response);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la création de la conversation :', error);
      }
    );
  }

  deconnection(){
    localStorage.removeItem('userId');
    window.location.reload();
  }
}

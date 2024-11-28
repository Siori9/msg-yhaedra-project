import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {ContainerMessagesComponent} from '../container-messages/container-messages.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-container-conversation',
  imports: [
    ContainerMessagesComponent,
    FormsModule
  ],
  templateUrl: './container-conversation.component.html',
  styleUrl: './container-conversation.component.css'
})
export class ContainerConversationComponent {
  convId: string | undefined;
  messages: any[] | undefined;
  title: string | undefined;

  input: string | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.convId = params['convId'];
      if(this.convId != undefined) {
        this.apiService.getConversationById(this.convId).subscribe((response) => {
          this.title = response.participants.filter((p: {id: string}) => p.id != localStorage.getItem('userId')).map((p: {name: string}) => p.name).join(',');
        })
      }
    });
  }

  send(){
    if(this.input != undefined && this.convId != undefined){
      let author = localStorage.getItem('userId')!
      this.apiService.addMessageToConversation(this.convId,{content: this.input, authorId: author}).subscribe(
        (response) => {
          console.log('Message envoyé :', response);
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du message :', error);
        }
      );
    }
  }
}

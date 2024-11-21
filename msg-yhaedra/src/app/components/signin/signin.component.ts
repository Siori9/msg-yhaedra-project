import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-signin',
  imports: [
    FormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  newUser = {
    name: '',
    email: '',
    password: '',
    imgUrl: '',
  };

  constructor(private apiService: ApiService) {}

  createUser(): void {
    console.log(this.newUser);
    if(this.newUser.name != undefined && this.newUser.email != undefined && this.newUser.imgUrl != undefined && this.newUser.password != undefined) {
      this.apiService.createUser(this.newUser).subscribe(
        (response) => {
          console.log('Utilisateur créé avec succès:', response);
          alert('Utilisateur créé avec succès!');
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
          alert('Erreur lors de la création de l\'utilisateur.');
        }
      );
    }
  }
}

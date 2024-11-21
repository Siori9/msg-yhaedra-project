import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  badConnection = false;

  constructor(private apiService: ApiService) {}

  connection(){
    if(this.credentials.email != undefined && this.credentials.password != undefined){
      this.apiService.login(this.credentials).subscribe(
        (response) => {
          const userId = response.id;
          const token = response.token;

          if (userId && token) {
            localStorage.setItem('userId', userId);
            localStorage.setItem('authToken', token);

            console.log('Connexion réussie. Utilisateur ID:', userId);
            window.location.reload();
          } else {
            this.badConnection = true;
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion:', error);
          this.badConnection = true;
        }
      );
    }
  }
}

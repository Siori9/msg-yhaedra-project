import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getConversations(): Observable<any[]> {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId) {
      throw new Error('Utilisateur non connecté.');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`, // Ajouter le token si votre API le nécessite
      }),
    };

    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/conversations`, httpOptions);
  }

  createConversation(participants: string[]): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if(userId != null) {
      participants.push(userId);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };

    const body = {participants};

    return this.http.post(`${this.baseUrl}/conversations`, body, httpOptions);
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/auth/login`, credentials);
  }

  createUser(user: { name: string; email: string; password: string; imgUrl?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

}


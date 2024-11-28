import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap, throwError} from 'rxjs';

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
        Authorization: `Bearer ${authToken}`,
      }),
    };

    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/conversations`, httpOptions);
  }

  getConversationById(id: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };

    return this.http.get(`${this.baseUrl}/conversations/${id}`, httpOptions);
  }

  createConversation(participants: string[]): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };

    if (userId != null) {
      return this.getUserById(userId).pipe(
        switchMap((response: any) => {
          participants.push(response.email);
          const body = { participants };
          console.log(participants, "taille: " + participants.length);
          return this.http.post(`${this.baseUrl}/conversations`, body, httpOptions);
        })
      );
    } else {
      console.error("Impossible de créer la conversation : userId est null.");
      return throwError(() => new Error("userId est requis pour créer une conversation."));
    }
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/auth/login`, credentials);
  }

  createUser(user: { name: string; email: string; password: string; imgUrl?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  getUserById(id: string){
    return this.http.get((`${this.baseUrl}/users/${id}`))
  }

  getMessagesByConversationId(conversationId: string): Observable<any[]> {
    const authToken = localStorage.getItem('authToken');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };

    return this.http.get<any[]>(`${this.baseUrl}/messages/conversation/${conversationId}`, httpOptions);
  }

  addMessageToConversation(conversationId: string, message: { content: string, authorId: string }): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };

    const body = {
      conversationId: conversationId,
      contenu: message.content,
      expediteurId: message.authorId,
    };

    return this.http.post(`${this.baseUrl}/messages`, body, httpOptions);
  }

}


import {Component, NgModule} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuConversationComponent} from './components/menu-conversation/menu-conversation.component';
import {MenuConnectionComponent} from './components/menu-connection/menu-connection.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuConversationComponent, MenuConnectionComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'msg-yhaedra';
  connection = localStorage.getItem('userId') == null;
}

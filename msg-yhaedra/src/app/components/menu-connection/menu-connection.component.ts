import { Component } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {NgIf, NgStyle} from '@angular/common';
import {SigninComponent} from '../signin/signin.component';

@Component({
  selector: 'app-menu-connection',
  imports: [
    LoginComponent,
    NgIf,
    SigninComponent,
    NgStyle
  ],
  templateUrl: './menu-connection.component.html',
  styleUrl: './menu-connection.component.css'
})
export class MenuConnectionComponent {
  menu = "login"

  changeMenu(value: string){
    this.menu = value;
  }
}

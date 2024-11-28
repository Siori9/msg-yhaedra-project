import { Routes } from '@angular/router';
import {ContainerConversationComponent} from './components/container-conversation/container-conversation.component';

export const routes: Routes = [
  {path: "conversations/:convId",component: ContainerConversationComponent},
];

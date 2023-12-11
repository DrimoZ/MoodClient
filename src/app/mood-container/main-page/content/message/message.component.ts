import { Component } from '@angular/core';
import {DtoInputGroup} from "../../../../Dtos/Groups/dto-input-group";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  groupes: DtoInputGroup[] = [];
  userId: string = "-1"
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;
}

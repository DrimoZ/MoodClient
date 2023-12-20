import {Component} from '@angular/core';
import {DtoInputGroup} from "../../../../Dtos/Groups/dto-input-group";
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {Router} from "@angular/router";
import {MessageService} from "../../../../Services/ApiRequest/message.service"
import {DtoInputMessage} from "../../../../Dtos/Groups/dto-input-message";
import {ImageService} from "../../../../Services/ApiRequest/image.service";
import {map} from "rxjs";
import {DtoOutputMessage} from "../../../../Dtos/Groups/DtoOutputMessage";
import {DatePipe} from "@angular/common";
import {FormBuilder, } from "@angular/forms";
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  groupes: DtoInputGroup[] = [];
  messages: DtoInputMessage[] = [];
  userId: string = "-1";
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;
  groupId:number  = -1;
  constructor( private _userService: UserService, private _messageService: MessageService,
               private _imageService:ImageService, private _router: Router) {
  }

  ngOnInit(): void {
    this._userService.getUserIdAndRole().subscribe({
      next: usr=> {
        this.userId = usr.userId;
        this._messageService.getUsersGroups().subscribe({
          next: grp => {
            this.groupes = grp;
            this.isWaitingForApi = false;
          },
          error: (err) => {
            console.log(err);
            if (err.status === 404) {
              this.isWaitingForApi = false;
            }
          }
        });
      },
      error: (err)=> {
        if (err.status === 404) {
          this.userId = "-1"
          this.isWaitingForApi = false;
        }
      }
    });
  }
}

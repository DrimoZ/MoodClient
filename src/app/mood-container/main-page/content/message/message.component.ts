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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {style} from "@angular/animations";
import {DtoInputOtherUser} from "../../../../Dtos/Users/Inputs/dto-input-other-user";
import {DtoOutputCreateGroup} from "../../../../Dtos/Groups/dto-output-create-group";
import {DtoInputUserFromGroup} from "../../../../Dtos/Groups/dto-input-userfromGroup";
import {SignalRService} from "../../../../Services/signal-r.service";
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  groupes: DtoInputGroup[] = [];
  messages: DtoInputMessage[] = [];
  userFriends: DtoInputOtherUser[] = [];
  friendToAdd: DtoInputOtherUser[] = [];
  userFromGroup: DtoInputUserFromGroup[] = [];
  showCount: number = 100;
  userId: string = "-1";
  userGroupId:number = 0
  groupIndex: number = -1;
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;
  friendsForm: FormGroup;
  groupId:number  = -1;
    constructor(private _signalR: SignalRService, private fb: FormBuilder,private _datePipe: DatePipe, private _userService: UserService,private _messageService:MessageService,private _imageService:ImageService, private _router: Router) {
      this.friendsForm = this.fb.group({
        name: ['',[Validators.required, Validators.minLength(3)]]
      });
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
    this._signalR.startConnection();
  }

  getImageUrl(id: number){
    return this._imageService.getImageData(id).pipe(map(url => {
      return url;
    }));
  }

  loadMoreMessage() {
    this.showCount += 20;
    this._messageService.getMessageFromGroupe(this.groupId, this.showCount +1,).subscribe(
      data => {
        data.forEach(msg => {
          this.getImageUrl( msg.imageId == null ? 0:msg.imageId).subscribe(img => {
            msg.url = img;
          })
        });
        this.messages = data;
        this.messages.reverse();
      }
    )
  }
}

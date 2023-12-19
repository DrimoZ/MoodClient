import { Component } from '@angular/core';
import {DtoInputMessage} from "../../../../../Dtos/Groups/dto-input-message";
import {DtoInputUserFromGroup} from "../../../../../Dtos/Groups/dto-input-userfromGroup";
import {DatePipe} from "@angular/common";
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {DtoOutputMessage} from "../../../../../Dtos/Groups/DtoOutputMessage";
import {MessageService} from "../../../../../Services/ApiRequest/message.service";
import {EventBusService} from "../../../../../Services/EventBus/event-bus.service";
import {map} from "rxjs";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";
import {ModalService} from "../../../../../Services/Modals/modal.service";
import {MemberPopupComponent} from "../../../../../Services/Modals/Custom/group-info-popup/member-popup.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', '../message.component.css', ]
})
export class ChatComponent {
  messages: DtoInputMessage[] = [];
  userFromGroup: DtoInputUserFromGroup[] = [];
  showCount: number = 100;
  userId: string = "-1";
  groupId:number = -1;
  userGroupId:number = -1;
  groupName:string = '';

  constructor(private modalService:ModalService ,private _datePipe: DatePipe, private _userService: UserService, private _imageService: ImageService, private _messageService: MessageService, private eb:EventBusService ) {
  }


  loadMoreMessage() {

  }
  formatDate(dateString: string): string
  {
    const date = new Date(dateString);
    let today = new Date(Date.now());
    let formattedDate;
    if(date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear())
      formattedDate  = this._datePipe.transform(dateString, 'HH:mm');
    else
      formattedDate = this._datePipe.transform(dateString, 'dd-MM-yyyy HH:mm');
    return formattedDate || '';
  }

  ngOnInit(): void {
    this._userService.getUserIdAndRole().subscribe({
      next: usr => {
        this.userId = usr.userId;
        console.log(this.userId);
      },
      error: (err) => {
        if (err.status === 404) {
          this.userId = "-1"
        }
      }
    });
    this.eb.onEvent().subscribe(event =>{
        if(event.Type ==="GroupClicked"){
          this.groupId = event.Payload.id;
          this.groupName = event.Payload.name;
          this.getMessages();
        }
        if(event.Type === "MessageGroupModified"){
          this.groupId = -1;
          this.messages = [];
          this.userFromGroup= [];
          this.groupName = "";
        }
    })

  }

  getImageUrl(id: number){
      return this._imageService.getImageData(id).pipe(map(url => {
          return url;
      }));
  }

  sendMessage(message: HTMLInputElement)
  {
    let msg:DtoOutputMessage = {
      content : message.value,
      userGroupId : this.userGroupId
    }
    this._messageService.sendOutputMessage(msg).subscribe({
      next: msg =>{
        this.getMessages();
        message.value = ''
      }
    });
    // this._signalR.sendMessage(user, message);
    //TODO implements signalR

  }

  private getMessages() {
    this._messageService.getMessageFromGroupe(this.groupId, this.showCount).subscribe({
      next: msgs => {
        this.messages = msgs;
        this._messageService.getUserGroup(this.groupId).subscribe({
          next: usrGrp => this.userGroupId = usrGrp.id
        })
        this.messages.reverse();
        this.messages.forEach(msg => {
          this.getImageUrl(msg.imageId == null ? 0 : msg.imageId).subscribe(img => {
            msg.url = img;
          })
        })
      }
    })
  }

  displayPopupMember() {
        this.modalService.open("popupMember")
  }
}

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
import {SignalRService} from "../../../../../Services/signal-r.service";
import {DtoInputGroup} from "../../../../../Dtos/Groups/dto-input-group";
import {ModalBusService, ModalEventName} from "../../../../../Services/EventBus/modal-bus.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', '../message.component.css', '../group-list/group-list.component.css' ]
})
export class ChatComponent {
  messages: DtoInputMessage[] = [];
  userFromGroup: DtoInputUserFromGroup[] = [];
  showCount: number = 100;
  userId: string = "-1";
  userGroupId: number = -1;
  group: DtoInputGroup = {
    name: "",
    proprioId: "",
    isPrivate: false,
    id : -1
  };

  constructor(private _signalR: SignalRService, private _datePipe: DatePipe,
              private _userService: UserService, private _imageService: ImageService,
              private _messageService: MessageService, private _eb: EventBusService,
              private _modalBus: ModalBusService) {
  }


  loadMoreMessage(nb : number) {
    this.showCount += nb;
    this._messageService.getMessageFromGroupe(this.group.id, nb,).subscribe(
      data => {
        data.forEach(msg => {
          this.getImageUrl( msg.imageId == null ? 0:msg.imageId).subscribe(img => {
            msg.url = img;
            this.messages.push(msg);
          })
        });
      }
    )
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
    this._userService.getConnectedUserStatus().subscribe({
      next: usr => {
        this.userId = usr.userId;
      },
      error: (err) => {
        if (err.status === 404) {
          this.userId = "-1"
        }
      }
    });

    this._eb.onEvent().subscribe(event =>{
      if(event.Type === "MessageGroupModified"){
        this.group.id = -1;
        this.messages = [];
        this.userFromGroup= [];
        this.group.name = "";
      }
      if(event.Type ==="GroupClicked"){
        this.showCount = 100;
        this.group = event.Payload;
        this.getMessages(this.showCount);
      }
      if(event.Type === "RecevievedMessage"){
        if(this.group.id == event.Payload.id){
          this.loadMoreMessage(1);
        }
      }
      if(event.Type === "DeletedMessage"){
        if(this.group.id == event.Payload.id){
          this.getMessages(this.showCount);
        }
      }
    })

  }

  getImageUrl(id: number){
      return this._imageService.getImageData(id).pipe(map(url => {
          return url;
      }));
  }

  sendMessage(message: HTMLTextAreaElement)
  {
    let msg:DtoOutputMessage = {
      content : message.value,
      userGroupId : this.userGroupId
    }
    this._messageService.sendOutputMessage(msg).subscribe({
      next: msg =>{
        message.value = ''
        this._signalR.sendMessageToGroup(msg, this.group);
      }
    });

  }

  private getMessages(number: number) {
    this._messageService.getMessageFromGroupe(this.group.id, number).subscribe({
      next: msgs => {
        this.messages = msgs;
        this._messageService.getUserGroup(this.group.id).subscribe({
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
    console.log(this.group.id)
    this._modalBus.emitEvent({
      Type: ModalEventName.GroupMembersInfoModal,
      Payload: {
        ModalId: "groupInfo",
        AdditionalData: this.group.id
      }
    })
  }

  deleteMessage(msg: DtoInputMessage) {
    this._messageService.setMessageIsDeleted(msg).subscribe({
      next: msg =>{
        this._signalR.messageRemoveFromGroup(this.group);
      }
    });
  }
}

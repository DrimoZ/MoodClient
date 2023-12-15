import {Component} from '@angular/core';
import {DtoInputGroup} from "../../../../Dtos/Groups/dto-input-group";
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {Router} from "@angular/router";
import {MessageService} from "../../../../Services/ApiRequest/message.service"
import {DtoInputMessage} from "../../../../Dtos/Groups/dto-input-message";
import {ImageService} from "../../../../Services/Image/image.service";
import {map} from "rxjs";
import {DtoOutputMessage} from "../../../../Dtos/Groups/DtoOutputMessage";
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {style} from "@angular/animations";
import {DtoInputOtherUser} from "../../../../Dtos/Users/Inputs/dto-input-other-user";
import {DtoOutputGroup} from "../../../../Dtos/Groups/dto-output-group";
import {DtoInputUserFromGroup} from "../../../../Dtos/Groups/dto-input-userfromGroup";
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  groupes: DtoInputGroup[] = [];
  messages: DtoInputMessage[] = [];
  userFriends: DtoInputOtherUser[] = [];
  friendToAdd: DtoInputOtherUser[] = [];
  userFromGroup: DtoInputUserFromGroup[] = [];
  userId: string = "-1";
  userGroupId:number = 0
  groupIndex: number = -1;
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;
  friendsForm: FormGroup;
  groupId:number  = -1;
    constructor(private fb: FormBuilder,private _datePipe: DatePipe, private _userService: UserService,private _messageService:MessageService,private _imageService:ImageService, private _router: Router) {
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
  }

  getMessageFromGroup(groupId: number, index: number)
  {
    this._messageService.getUserFromGroup(groupId).subscribe({
        next: usr =>{
            this.userFromGroup = usr;
        }
    })
    this._messageService.getUserGroup(groupId).subscribe({
      next: usergrp=>{
        this.userGroupId = usergrp.id;
      }
    })
    this.groupIndex = index;
    this.groupId = groupId;
    this.messages = [];
    this._messageService.getAllMessageForAGroupe(this.groupId).subscribe({
      next: msg =>{
        msg.forEach(msg => {
          this.getImageUrl( msg.imageId == null ? 0:msg.imageId).subscribe(img => {
            msg.url = img;
          })
        })
        this.messages = msg;
      }
    });
  }

  getImageUrl(id: number){
    return this._imageService.getImageData(id).pipe(map(url => {
      return url;
    }));
  }

  sendMessage(message: string)
  {
    let usergroup = this.userGroupId;
    let msg:DtoOutputMessage = new class implements DtoOutputMessage{
      content: string = message;
      userGroupId: number = usergroup;
    }
    this._messageService.sendOutputMessage(msg).subscribe();
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
  protected readonly alert = alert;
  protected readonly console = console;

  createGroupe(friendsToadd: string[]) {

  }

  getUserFriends(){
    this._userService.getUserFriends(this.userId).subscribe({
      next: (user) => {
        this.userFriends = user.friends;
      },
      error: (err) => {
        if (err.status === 404) {
        }
      }
    })
  }

  addFriend(friend: HTMLLIElement, frd: DtoInputOtherUser) {
    if(friend.classList.contains('btnColor')) {
      friend.classList.remove('btnColor')
      friend.classList.add('btnColorToggled');
      this.friendToAdd.push(frd);
    }
    else{
      friend.classList.remove('btnColorToggled');
      friend.classList.add('btnColor');
      const indexToRemove = this.friendToAdd.findIndex(item => item ==frd);
      if (indexToRemove !== -1) {
        this.friendToAdd.splice(indexToRemove, 1);
      }
    }
  }

  protected readonly length = length;

  addGroup(groupName: string) {
    console.log(this.friendToAdd)
    let grp:DtoOutputGroup;
    let userIds: string[] = [];
    for(let frd of this.friendToAdd){
      userIds.push(frd.id);
    }
    grp = new class implements DtoOutputGroup {
      name: string = groupName;
      userIds: string[] = userIds;
    }
    this._messageService.createGroup(grp).subscribe();
    this.friendToAdd = [];
    this.userFriends = [];
  }

    protected readonly style = style;
}

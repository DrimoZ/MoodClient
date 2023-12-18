import { Component } from '@angular/core';
import {DtoInputGroup} from "../../../../../Dtos/Groups/dto-input-group";
import {DtoInputOtherUser} from "../../../../../Dtos/Users/Inputs/dto-input-other-user";
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {MessageService} from "../../../../../Services/ApiRequest/message.service";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";
import {ModalService} from "../../../../../Services/Modals/modal.service";
import {EventBusService} from "../../../../../Services/EventBus/event-bus.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['../message.component.css', './group-list.component.css']
})
export class GroupListComponent {
  groups: DtoInputGroup[] = [];
  userId: string = "-1";

  constructor(private _userService: UserService,private _messageService:MessageService, private modalService: ModalService, private eb:EventBusService) {
  }
  ngOnInit(): void {
    this._userService.getUserIdAndRole().subscribe({
      next: usr=> {
        this.userId = usr.userId;
        this._messageService.getUsersGroups().subscribe({
          next: grp => {
            this.groups = grp;
          },
          error: (err) => {
            console.log(err);
            if (err.status === 404) {
            }
          }
        });
      },
      error: (err)=> {
        if (err.status === 404) {
          this.userId = "-1"
        }
      }
    });
    this.eb.onEvent().subscribe(event =>{
      if(event.Type ==="MessageGroupCreated"){
        console.log("ICI")
        this._messageService.getUsersGroups().subscribe({
          next: grp => {
            this.groups = grp;
          }
        })
      }
    })
  }
  addFriend(friend: HTMLLIElement, frd: DtoInputOtherUser) {

  }

  addFriendToConv(frd: DtoInputOtherUser, popup: HTMLDivElement) {

  }

  getUserFriends() {

  }

  formReset() {

  }

  addGroup(value: string) {

  }

  getMessageFromGroup(id: number, index: number) {

  }

  displayPopup() {
    this.modalService.open("popup")
  }
}

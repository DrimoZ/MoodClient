import { Component } from '@angular/core';
import {DtoInputGroup} from "../../../../../Dtos/Groups/dto-input-group";
import {DtoInputOtherUser} from "../../../../../Dtos/Users/Inputs/dto-input-other-user";
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {MessageService} from "../../../../../Services/ApiRequest/message.service";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";
import {ModalService} from "../../../../../Services/Modals/modal.service";
import {EventBusService} from "../../../../../Services/EventBus/event-bus.service";
import {timeout} from "rxjs";
import {SignalRService} from "../../../../../Services/signal-r.service";
import {ModalBusService, ModalEventName} from "../../../../../Services/EventBus/modal-bus.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['../message.component.css', './group-list.component.css']
})
export class GroupListComponent {
  groups: DtoInputGroup[] = [];
  userId: string = "-1";

  constructor(private _userService: UserService,private _messageService:MessageService,
              private modalService: ModalService, private eb:EventBusService,
              private _modalBus: ModalBusService, private _signalR :SignalRService) {
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
    this._signalR.startConnection();
    this.eb.onEvent().subscribe(event =>{
      if(event.Type ==="MessageGroupModified"){
        this._messageService.getUsersGroups().subscribe({
          next: grp => {
            this.groups = grp;
          }
        })
      }
    })
  }

  getMessageFromGroup(id: number, index: number) {

  }

  displayPopup() {
    this._modalBus.emitEvent({
      Type: ModalEventName.GroupCreationModal,
      Payload: {
        ModalId: "groupCreation",
        AdditionalData: null
      }
    })
  }

  groupClicked(grp: DtoInputGroup) {
    this.eb.emitEvent({
      Type:'GroupClicked',
        Payload: grp
    })
  }
}

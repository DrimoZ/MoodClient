import {Component, ElementRef} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {UserService} from "../../../ApiRequest/user.service";
import {EventBusService} from "../../../EventBus/event-bus.service";

@Component({
  selector: 'account-deletion-modal',
  templateUrl: './account-deletion-modal.component.html',
  styleUrls: ['./account-deletion-modal.component.css']
})
export class AccountDeletionModalComponent extends ModalBaseComponent{

  constructor(modalService: ModalService, _el: ElementRef, private _userService: UserService, private _eventBus: EventBusService) {
    super(modalService, _el);
  }


  deleteAccount() {
    this._userService.deleteAccount().subscribe({
      next: () => {
        this._eventBus.emitEvent({
          Type: 'UserLogOut',
          Payload: ''
        })
      }
    });
  }
}

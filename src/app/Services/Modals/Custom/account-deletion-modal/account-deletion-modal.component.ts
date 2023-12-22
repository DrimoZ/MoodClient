import {Component, ElementRef} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {UserService} from "../../../ApiRequest/user.service";
import {EventBusService} from "../../../EventBus/event-bus.service";
import {Router} from "@angular/router";

@Component({
  selector: 'account-deletion-modal',
  templateUrl: './account-deletion-modal.component.html',
  styleUrls: ['./account-deletion-modal.component.css']
})
export class AccountDeletionModalComponent extends ModalBaseComponent{

  constructor(modalService: ModalService, _el: ElementRef, private _userService: UserService, private _router: Router) {
    super(modalService, _el);
  }


  deleteAccount() {
    this._userService.getConnectedUserStatus().subscribe(res => {
      this._userService.userDelete(res.userId).subscribe(() => {
        this._router.navigate(["/login"])
        this.close();
      })
    });
  }
}

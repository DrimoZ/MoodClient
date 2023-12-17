import {Component, ElementRef} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {UserService} from "../../../ApiRequest/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'modal-del-account',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.css']
})
export class DeleteAccountModalComponent extends ModalBaseComponent{

  constructor(modalService: ModalService, _el: ElementRef, private _userService: UserService, private _router: Router) {
    super(modalService, _el);
  }


  deleteAccount() {
    this._userService.deleteAccount().subscribe({
      next: () => {
        this._router.navigate(["login"]);
      }
    });
  }
}

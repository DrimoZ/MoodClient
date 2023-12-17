import {Component, ElementRef} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.css']
})
export class DeleteAccountModalComponent extends ModalBaseComponent{

  constructor(modalService: ModalService, _el: ElementRef) {
    super(modalService, _el);
  }
}

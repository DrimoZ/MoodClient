import {Component, ElementRef} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";

@Component({
  selector: 'language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.css']
})
export class LanguageModalComponent extends ModalBaseComponent{

  constructor(modalService: ModalService, _el: ElementRef) {
    super(modalService, _el);
  }

  changeLanguage(val: HTMLOptionElement | null) {
    if (val == null || val.value === "") return
    else {
      location.assign(`http://localhost:4200/${val.value}/`);
    }

  }
}

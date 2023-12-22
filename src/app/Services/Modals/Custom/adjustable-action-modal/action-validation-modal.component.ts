import {Component, ElementRef, Input} from '@angular/core';
import {ModalBaseComponent} from "../../modal-base/modal-base.component";
import {ModalService} from "../../modal.service";
import {EventBusService} from "../../../EventBus/event-bus.service";

@Component({
  selector: 'action-validation-modal',
  templateUrl: './action-validation-modal.component.html',
  styleUrls: ['./action-validation-modal.component.css']
})
export class ActionValidationModalComponent extends ModalBaseComponent{
  @Input() textValue: string = "";


  constructor(modalService: ModalService, _el: ElementRef, private _eventBus: EventBusService) {
    super(modalService, _el);
  }


  validate(b: boolean) {
    this._eventBus.emitEvent({
      Type: 'ActionValidation',
      Payload: {
        modalId: this.id,
        result: b
      }
    });

    this.close();
  }
}

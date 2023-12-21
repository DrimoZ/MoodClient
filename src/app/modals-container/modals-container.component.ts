import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../Services/Modals/modal.service";
import {Subscription} from "rxjs";
import {ModalBusService, ModalEventName} from "../Services/EventBus/modal-bus.service";

@Component({
  selector: 'app-modals-container',
  templateUrl: './modals-container.component.html',
  styleUrls: ['./modals-container.component.css']
})
export class ModalsContainerComponent implements OnInit, OnDestroy {
  private _busSubscription: Subscription;
  modalType: string = "";
  modalId: string = "";
  modalAdditionalData: any;

  constructor(private _modalService: ModalService, private _eventBus: ModalBusService) {
  }

  ngOnInit(): void {
    this._busSubscription = this._eventBus.onEvent().subscribe({
      next: event => {
        this.modalType = event.Type;
        this.modalId = event.Payload.ModalId;
        this.modalAdditionalData = event.Payload.AdditionalData

        setTimeout(() => {
          this._modalService.open(this.modalId)
        }, 100);
      }
    })
  }

  ngOnDestroy() {
    this._busSubscription && this._busSubscription.unsubscribe()
  }

  protected readonly ModalEventName = ModalEventName;
  protected readonly parseInt = parseInt;
}

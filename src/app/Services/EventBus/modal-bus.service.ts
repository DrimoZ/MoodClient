import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalBusService {
  private _eventBus = new Subject<ModalEvent>();

  emitEvent(event: ModalEvent) {
    this._eventBus.next(event);
  }

  onEvent() {
    return this._eventBus.asObservable();
  }
}

interface ModalEvent {
  Type: ModalEventName;
  Payload: {
    ModalId: string,
    AdditionalData: {} | null
  };
}

export enum ModalEventName {
  AccountDeletionModal = "AccountDeletionModal",
  PublicationDetailModal = "PublicationDetailModal",
  GroupMembersInfoModal = "GroupMembersInfoModal",
  GroupCreationModal = "GroupCreationModal",
  ProfilePictureEditionModal = "ProfilePictureEditionModal",
  PublicationCreationModal = "PublicationCreationModal",
  GroupMemberAdditionModal = "GroupMemberAdditionModal",
  ActionValidationModal = "ActionValidationModal",
  LanguageModal = "LanguageModal"
}


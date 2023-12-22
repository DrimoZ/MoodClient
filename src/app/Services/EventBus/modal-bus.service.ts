import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {
  ProfilePictureEditionModalComponent
} from "../Modals/Custom/profile-picture-edition-modal/profile-picture-edition-modal.component";
import {
  PublicationCreationModalComponent
} from "../Modals/Custom/publication-creation-modal/publication-creation-modal.component";
import {
  GroupMemberAdditionModalComponent
} from "../Modals/Custom/group-member-addition-modal/group-member-addition-modal.component";
import {AccountDeletionModalComponent} from "../Modals/Custom/account-deletion-modal/account-deletion-modal.component";
import {
  ActionValidationModalComponent
} from "../Modals/Custom/adjustable-action-modal/action-validation-modal.component";


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
}


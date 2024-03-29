import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalBaseComponent } from "./Services/Modals/modal-base/modal-base.component";
import { AccountDeletionModalComponent } from "./Services/Modals/Custom/account-deletion-modal/account-deletion-modal.component";
import { GroupCreationModalComponent } from "./Services/Modals/Custom/group-creation-modal/group-creation-modal.component";
import { GroupMemberAdditionModalComponent } from "./Services/Modals/Custom/group-member-addition-modal/group-member-addition-modal.component";
import { GroupMembersInfoModalComponent } from "./Services/Modals/Custom/group-members-info-modal/group-members-info-modal.component";
import { ProfilePictureEditionModalComponent } from "./Services/Modals/Custom/profile-picture-edition-modal/profile-picture-edition-modal.component";
import { PublicationCreationModalComponent } from "./Services/Modals/Custom/publication-creation-modal/publication-creation-modal.component";
import { PublicationDetailModalComponent } from "./Services/Modals/Custom/publication-detail-modal/publication-detail-modal.component";
import {
  ActionValidationModalComponent
} from "./Services/Modals/Custom/adjustable-action-modal/action-validation-modal.component";
import {LanguageModalComponent} from "./Services/Modals/Custom/language-modal/language-modal.component";

@NgModule({
  declarations: [
    ModalBaseComponent,

    AccountDeletionModalComponent,
    ActionValidationModalComponent,
    GroupCreationModalComponent,
    GroupMemberAdditionModalComponent,
    GroupMembersInfoModalComponent,
    ProfilePictureEditionModalComponent,
    PublicationCreationModalComponent,
    PublicationDetailModalComponent,
    LanguageModalComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
  exports: [
    AccountDeletionModalComponent,
    ActionValidationModalComponent,
    GroupMemberAdditionModalComponent,
    PublicationCreationModalComponent,
    GroupMembersInfoModalComponent,
    GroupCreationModalComponent,
    ProfilePictureEditionModalComponent,
    PublicationDetailModalComponent,
    LanguageModalComponent
  ]
})

export class UtilsModule { }

import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import { FriendsComponent } from './friends/friends.component';
import { AccountComponent } from './account/account.component';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {
  ProfilePictureModalComponent
} from "../../../../Services/Modals/Custom/profile-picture-modal/profile-picture-modal.component";
import {ContentModule} from "../content.module";
import {
  PublicationDetailModalComponent
} from "../../../../Services/Modals/Custom/publication-detail-modal/publication-detail-modal.component";
@NgModule({
  declarations: [
    PublicationsComponent,
    FriendsComponent,
    AccountComponent,
    ProfilePictureModalComponent,
    PublicationDetailModalComponent
  ],
  imports: [
    ProfileRoutingModule,
    NgbModule,
    NgForOf,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgStyle,

  ],
  providers: [],
  exports: [
    ProfilePictureModalComponent,
    PublicationDetailModalComponent
  ]
})
export class ProfileModule { }

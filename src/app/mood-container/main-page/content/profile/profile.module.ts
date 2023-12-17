import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import { FriendsComponent } from './friends/friends.component';
import { AccountComponent } from './account/account.component';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {
  ProfilePictureModalComponent
} from "../../../../Services/Modals/Custom/profile-picture-modal/profile-picture-modal.component";
@NgModule({
  declarations: [
    PublicationsComponent,
    FriendsComponent,
    AccountComponent,
    ProfilePictureModalComponent
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
    NgIf
  ],
  providers: [],
  exports: [
    ProfilePictureModalComponent
  ]
})
export class ProfileModule { }

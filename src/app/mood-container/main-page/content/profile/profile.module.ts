import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import { FriendsComponent } from './friends/friends.component';
import { AccountComponent } from './account/account.component';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [
    PublicationsComponent,
    FriendsComponent,
    AccountComponent,
    ModalComponent
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
    ModalComponent
  ]
})
export class ProfileModule { }

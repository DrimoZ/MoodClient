import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import { FriendsComponent } from './friends/friends.component';
import { AccountComponent } from './account/account.component';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    PublicationsComponent,
    FriendsComponent,
    AccountComponent
  ],
  imports: [
    ProfileRoutingModule,
    NgbModule,
    NgForOf,
    NgClass,
    FormsModule,
  ],
  providers: [],
})
export class ProfileModule { }

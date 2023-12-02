import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import { FriendsComponent } from './friends/friends.component';
import { AccountComponent } from './account/account.component';
@NgModule({
  declarations: [
    PublicationsComponent,
    FriendsComponent,
    AccountComponent
  ],
    imports: [
      ProfileRoutingModule,
      NgbModule,
    ],
  providers: [],
})
export class ProfileModule { }

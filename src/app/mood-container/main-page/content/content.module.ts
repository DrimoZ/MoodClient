import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import {ContentRoutingModule} from "./content-routing.module";
import { NotificationComponent } from './notification/notification.component';
import { DiscoverComponent } from './discover/discover.component';
import { ParametersComponent } from './parameters/parameters.component';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileModule} from "./profile/profile.module";
import { DeleteAccountModalComponent } from "../../../Services/Modals/Custom/delete-account-modal/delete-account-modal.component";
import { GroupListComponent } from './message/group-list/group-list.component';
import {PopupComponent} from "../../../Services/Modals/Custom/popup/popup.component";
import { ChatComponent } from './message/chat/chat.component';
import {MemberPopupComponent} from "../../../Services/Modals/Custom/member-popup/member-popup.component";
@NgModule({
  declarations: [
    ProfileComponent,
    MessageComponent,
    NewsFeedComponent,
    NotificationComponent,
    DiscoverComponent,
    ParametersComponent,
    GroupListComponent,
    PopupComponent,
    ChatComponent,
    MemberPopupComponent,
    DeleteAccountModalComponent
  ],
  imports: [
    NgbModule,
    ContentRoutingModule,
    NgForOf,
    NgClass,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    ProfileModule
  ],
  exports: [
    PopupComponent,
    MemberPopupComponent,
    DeleteAccountModalComponent
  ],
  providers: []
})
export class ContentModule { }

import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import {ContentRoutingModule} from "./content-routing.module";
import { NotificationComponent } from './notification/notification.component';
import { DiscoverComponent } from './discover/discover.component';
import { ParametersComponent } from './parameters/parameters.component';
@NgModule({
  declarations: [
    ProfileComponent,
    MessageComponent,
    NewsFeedComponent,
    NotificationComponent,
    DiscoverComponent,
    ParametersComponent
  ],
  imports: [
    NgbModule,
    ContentRoutingModule
  ],
  providers: [],
})
export class ContentModule { }

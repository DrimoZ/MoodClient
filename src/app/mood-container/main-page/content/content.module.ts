import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import {ContentRoutingModule} from "./content-routing.module";
@NgModule({
  declarations: [
    ProfileComponent,
    MessageComponent,
    NewsFeedComponent
  ],
  imports: [
    NgbModule,
    ContentRoutingModule
  ],
  providers: [],
})
export class ContentModule { }

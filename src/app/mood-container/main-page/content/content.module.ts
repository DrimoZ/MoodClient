import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
@NgModule({
  declarations: [
    ProfileComponent,
    MessageComponent,
    NewsFeedComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
})
export class ContentModule { }

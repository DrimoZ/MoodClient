import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {ProfileComponent} from "./profile/profile.component";
import {MessageComponent} from "./message/message.component";
import {DiscoverComponent} from "./discover/discover.component";
import {NotificationComponent} from "./notification/notification.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "./newsfeed"},
  {path: "newsfeed", component: NewsFeedComponent},
  {path: "discover", component: DiscoverComponent},
  {path: "messages", component: MessageComponent},
  {path: "notifications", component: NotificationComponent},
  {path: "profile", component: ProfileComponent},
  {path: "**", redirectTo: "./newsfeed"},
];

@NgModule({

  imports: [RouterModule.forChild(routes)]
})
export class ContentRoutingModule { }

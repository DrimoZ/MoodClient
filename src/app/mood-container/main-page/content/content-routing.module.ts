import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {ProfileComponent} from "./profile/profile.component";
import {MessageComponent} from "./message/message.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "./newsfeed"},
  {path: "newsfeed", component: NewsFeedComponent},
  {path: "discover", component: NewsFeedComponent},
  {path: "messages", component: MessageComponent},
  {path: "notifications", component: NewsFeedComponent},
  {path: "profile", component: ProfileComponent},
  {path: "**", redirectTo: "./newsfeed"},
];

@NgModule({

  imports: [RouterModule.forChild(routes)]
})
export class ContentRoutingModule { }

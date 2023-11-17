import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "../../login-page/login-page.component";
import {RegisterPageComponent} from "../../register-page/register-page.component";
import {MainPageComponent} from "../main-page.component";
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {ProfileComponent} from "./profile/profile.component";
import {MessageComponent} from "./message/message.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/newsfeed"},
  {path: "newsfeed", component: NewsFeedComponent},
  {path: "profile", component: ProfileComponent},
  {path: "message", component: MessageComponent},
  {path: "**", redirectTo: "/newsfeed"},
];

@NgModule({

  imports: [RouterModule.forChild(routes)]
})
export class ContentRoutingModule { }

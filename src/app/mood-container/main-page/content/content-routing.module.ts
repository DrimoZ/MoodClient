import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {ProfileComponent} from "./profile/profile.component";
import {MessageComponent} from "./message/message.component";
import {DiscoverComponent} from "./discover/discover.component";
import {NotificationComponent} from "./notification/notification.component";
import {ParametersComponent} from "./parameters/parameters.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/newsfeed"},
  {path: "newsfeed", component: NewsFeedComponent},
  {path: "discover", component: DiscoverComponent, loadChildren: () => import('./discover/discover.module').then(module => module.DiscoverModule) },
  {path: "messages", component: MessageComponent},
  {path: "notifications", component: NotificationComponent},
  {path: "profile", component: ProfileComponent},
  {path: "parameters", component: ParametersComponent},
  {path: "**", redirectTo: "/newsfeed"},
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }

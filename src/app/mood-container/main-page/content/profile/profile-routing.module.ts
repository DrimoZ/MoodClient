import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PublicationsComponent} from "./publications/publications.component";
import {FriendsComponent} from "./friends/friends.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "me"},
  {path: "shared", component: PublicationsComponent},
  {path: "friends", component: FriendsComponent},
  {path: "me", component: AccountComponent},
  {path: "**", redirectTo: "me"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ProfileRoutingModule { }

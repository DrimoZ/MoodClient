import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PublicationsComponent} from "./publications/publications.component";
import {FriendsComponent} from "./friends/friends.component";
import {AccountComponent} from "./account/account.component";
import {ProfileAccountGuard} from "../../../../Guards/profileAccountGuard";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "shared"},
  {path: "shared", component: PublicationsComponent},
  {path: "friends", component: FriendsComponent},
  {path: "account", component: AccountComponent, canActivate: [ProfileAccountGuard]},
  {path: "**", redirectTo: "shared"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

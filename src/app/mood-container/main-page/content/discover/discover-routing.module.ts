import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PublicationComponent} from "./publication/publication.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "./publications"},
  {path: "publications", component: PublicationComponent},
  {path: "profiles", component: ProfileComponent},
  {path: "**", redirectTo: "./all"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DiscoverRoutingModule { }

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AllComponent} from "./all/all.component";
import {PublicationComponent} from "./publication/publication.component";
import {TagComponent} from "./tag/tag.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "./all"},
  {path: "all", component: AllComponent},
  {path: "publications", component: PublicationComponent},
  {path: "profiles", component: ProfileComponent},
  {path: "tags", component: TagComponent},
  {path: "**", redirectTo: "./all"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DiscoverRoutingModule { }

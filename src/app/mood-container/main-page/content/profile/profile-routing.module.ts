import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PublicationsComponent} from "./publications/publications.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "./shared"},
  {path: "shared", component: PublicationsComponent},
  {path: "**", redirectTo: "./shared"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ProfileRoutingModule { }

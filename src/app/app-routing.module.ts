import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./mood-container/login-page/login-page.component";
import {RegisterPageComponent} from "./mood-container/register-page/register-page.component";
import {MainPageComponent} from "./mood-container/main-page/main-page.component";
import {RouterAuthGuard} from "./Services/routerAuthGuard";
import {ConnectionRefusedComponent} from "./mood-container/errors/connection-refused/connection-refused.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/login"},
  {path: "login", component: LoginPageComponent, canActivate: [RouterAuthGuard]},
  {path: "register", component: RegisterPageComponent, canActivate: [RouterAuthGuard]},
  {path: "home", component: MainPageComponent, loadChildren: () => import('./mood-container/main-page/content/content.module').then(module => module.ContentModule)},
  {path: "connectionRefused", component: ConnectionRefusedComponent},
  {path: "**", redirectTo: "/login"}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

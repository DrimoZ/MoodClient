import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { PublicationComponent } from './publication/publication.component';
import {DiscoverRoutingModule} from "./discover-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ProfileModule} from "../profile/profile.module";


@NgModule({
  declarations: [
    PublicationComponent,
    ProfileComponent,
  ],
  imports: [
    NgbModule,
    DiscoverRoutingModule,
    NgForOf,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    AsyncPipe,
    RouterLink,
    ProfileModule
  ],
  providers: [],
})
export class DiscoverModule { }

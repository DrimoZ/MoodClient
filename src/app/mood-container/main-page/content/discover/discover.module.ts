import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { AllComponent } from './all/all.component';
import { PublicationComponent } from './publication/publication.component';
import {DiscoverRoutingModule} from "./discover-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    AllComponent,
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
    RouterLink
  ],
  providers: [],
})
export class DiscoverModule { }

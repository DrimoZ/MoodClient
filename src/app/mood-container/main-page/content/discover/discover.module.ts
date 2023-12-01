import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import {NgClass, NgForOf} from "@angular/common";
import { AllComponent } from './all/all.component';
import { PublicationComponent } from './publication/publication.component';
import { TagComponent } from './tag/tag.component';
import {DiscoverRoutingModule} from "./discover-routing.module";


@NgModule({
  declarations: [
    AllComponent,
    PublicationComponent,
    ProfileComponent,
    TagComponent
  ],
    imports: [
        NgbModule,
        DiscoverRoutingModule,
        NgForOf,
        NgClass
    ],
  providers: [],
})
export class DiscoverModule { }

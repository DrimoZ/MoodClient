import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PublicationsComponent} from "./publications/publications.component";
import {ProfileRoutingModule} from "./profile-routing.module";
@NgModule({
  declarations: [
    PublicationsComponent
  ],
    imports: [
      ProfileRoutingModule,
      NgbModule,
    ],
  providers: [],
})
export class ProfileModule { }

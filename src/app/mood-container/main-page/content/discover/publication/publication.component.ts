import { Component } from '@angular/core';
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {BehaviorEventBusService} from "../../../../../Services/EventBus/behavior-event-bus.service";
import {Router} from "@angular/router";
import {DtoInputPublication} from "../../../../../Dtos/Publication/Input/dto-input-publication";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  searchBarValue: string = "";
  publications: DtoInputPublication[] = [];
  showCount: number = 30;
  isWaitingForApi: boolean = true;

  constructor(private _dataService: UserService, private _behaviorEventBus: BehaviorEventBusService,
              private _router: Router) {
  }

  ngOnInit(): void {
    // this._dataService.getDiscoverPublications(this.showCount, this.searchBarValue).subscribe(
    //   data => {
    //     this.publications = data;
    //
    //     this.isWaitingForApi = false;
    //   }
    // )

    this._behaviorEventBus.onEvent().subscribe(event => {
      if (event.Type === 'DiscoverSearch') {
        this.searchBarValue = event.Payload;

        this.isWaitingForApi = true;

        this._dataService.getDiscoverPublications(this.showCount, this.searchBarValue).subscribe(
          data => {
            this.publications = data;

            this.isWaitingForApi = false;
          }
        )
      }
    })
  }

  loadModePublications() {
    this.showCount += 30;
    this.isWaitingForApi = true;

    this._dataService.getDiscoverPublications(this.showCount, this.searchBarValue).subscribe(
      data => {
        this.publications = data;

        this.isWaitingForApi = false;
      }
    )
  }

  getDetailedPublication(id: number) {

  }
}

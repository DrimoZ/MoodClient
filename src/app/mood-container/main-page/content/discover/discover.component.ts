import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorEventBusService} from "../../../../Services/EventBus/behavior-event-bus.service";
import {EventBusService} from "../../../../Services/EventBus/event-bus.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  isInputFocused: boolean = false;
  selectedFilter: string = this._router.url.split("discover/")[1];
  searchBarValue: string = "";

  constructor(private _router: Router, private _behaviorEventBus: BehaviorEventBusService) {}

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  emitSearchChange() {
    this._behaviorEventBus.emitEvent({
      Type: "DiscoverSearch",
      Payload: this.searchBarValue
    })
  }
}

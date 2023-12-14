import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {BehaviorEventBusService} from "../../../../Services/EventBus/behavior-event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit, OnDestroy{
  isInputFocused: boolean = false;
  selectedFilter: string = this._router.url.split("discover/")[1];
  searchBarValue: string = "";
  routerSubscription: Subscription | null = null ;

  constructor(private _router: Router, private _behaviorEventBus: BehaviorEventBusService) {}

  ngOnInit() {
    this._behaviorEventBus.emitEvent({
      Type: "DiscoverSearch",
      Payload: this.searchBarValue
    })

    this.routerSubscription = this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._behaviorEventBus.emitEvent({
          Type: "DiscoverSearch",
          Payload: this.searchBarValue
        })
      }
    })
  }

  ngOnDestroy() {
    this.routerSubscription && this.routerSubscription.unsubscribe()
  }

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

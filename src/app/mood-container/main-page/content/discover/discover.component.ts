import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  isInputFocused: boolean = false;
  selectedFilter: string = this._router.url.split("discover/")[1];
  searchBarValue: string = "";

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
    _activatedRoute.url.subscribe(p => console.log(p));
    console.log(_router);

  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }


}

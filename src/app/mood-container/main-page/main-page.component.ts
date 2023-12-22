import { Component } from '@angular/core';
import {SignalRService} from "../../Services/signal-r.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private _sR:SignalRService) {

  }

  ngOnInit() {
    this._sR.startConnection();
  }
}

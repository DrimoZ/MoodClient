import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventBusService} from "../Services/event-bus.service";
import {DtoOutputSignIn} from "../Dtos/dto-output-signin";

@Component({
  selector: 'app-mood-container',
  templateUrl: './mood-container.component.html',
  styleUrls: ['./mood-container.component.css']
})
export class MoodContainerComponent implements OnInit {
  constructor(private _router: Router, private _eventBus: EventBusService) {}

  ngOnInit() {
    this._eventBus.onEvent().subscribe(event => {
      switch (event.type) {
        case 'userSignIn':
          this.logUser(event.payload);
          break;
      }
    });
  }

  logUser(dto: DtoOutputSignIn) {
    console.log(dto);
    this._router.navigate(['/main']);
  }
}

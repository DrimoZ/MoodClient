import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventBusService} from "../Services/event-bus.service";
import {DtoOutputSignIn} from "../Dtos/dto-output-signin";
import {AuthenticationService} from "../Services/authentication.service";
import {DtoOutputSignUp} from "../Dtos/dto-output-signup";

@Component({
  selector: 'app-mood-container',
  templateUrl: './mood-container.component.html',
  styleUrls: ['./mood-container.component.css']
})
export class MoodContainerComponent implements OnInit {
  constructor(private _router: Router, private _eventBus: EventBusService, private _authService: AuthenticationService) {}

  ngOnInit() {
    this._eventBus.onEvent().subscribe(event => {
      switch (event.type) {
        case 'userSignIn':
          this.signInUser(event.payload);
          break;
        case 'userSignUp':
          this.signUpUser(event.payload);
          break;
      }
    });
  }

  signInUser(dto: DtoOutputSignIn) {
    //this._authService.signInUser(dto).subscribe(t => this._router.navigate(['/main']));
    this._router.navigate(['/home']);
  }

  signUpUser(dto: DtoOutputSignUp) {
    //this._authService.signUnUser(dto).subscribe(t => this._router.navigate(['/main']));
    this._router.navigate(['/home']);
  }
}

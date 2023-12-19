import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventBusService} from "../Services/EventBus/event-bus.service";
import {DtoOutputUserSignin} from "../Dtos/Users/Outputs/dto-output-user-signin";
import {DtoOutputUserSignup} from "../Dtos/Users/Outputs/dto-output-user-signup";
import {AuthenticationService} from "../Services/ApiRequest/authentication.service";

@Component({
  selector: 'app-mood-container',
  templateUrl: './mood-container.component.html',
  styleUrls: ['./mood-container.component.css']
})
export class MoodContainerComponent implements OnInit {
  constructor(private _router: Router, private _eventBus: EventBusService, private _authService: AuthenticationService) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this._eventBus.onEvent().subscribe(event => {
      switch (event.Type) {
        case 'UserSignIn':
          this.signInUser(event.Payload);
          break;
        case 'UserSignUp':
          this.signUpUser(event.Payload);
          break;
        case 'UserLogOut':
          this.logOutUser();
          break;
      }
    });
  }

  signInUser(dto: DtoOutputUserSignin) {
    this._authService.signInUser(dto).subscribe({
      next: () => {
        this._router.navigate(['home/newsfeed'])
      },
      error: (err) => {
        this._eventBus.emitEvent({
          Type: 'UserFailedSignIn',
          Payload: ''
        })
      }
    });
  }

  signUpUser(dto: DtoOutputUserSignup) {
    this._authService.signUpUser(dto).subscribe({
      next: () => {
        this._router.navigate(['home/newsfeed'])
      },
      error: (err) => {
        this._eventBus.emitEvent({
          Type: 'UserFailedSignUp',
          Payload: ''
        })
      }
    });
  }

  logOutUser() {
    this._authService.logOutUser().subscribe({
      next: () => {
        this._router.navigate([''])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}

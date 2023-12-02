import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventBusService} from "../Services/event-bus.service";
import {DtoOutputSignIn} from "../Dtos/Users/Outputs/dto-output-signin";
import {AuthenticationService} from "../Services/authentication.service";
import {DtoOutputSignUp} from "../Dtos/Users/Outputs/dto-output-signup";

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
          console.log(event.payload);
          this.signUpUser(event.payload);
          break;
        case 'userLogOut':
          this.logOutUser();
          break;
      }
    });
  }

  signInUser(dto: DtoOutputSignIn) {
    this._authService.signInUser(dto).subscribe({
      next: () => {
        this._router.navigate(['home/newsfeed'])
      },
      error: (err) => {
        this._eventBus.emitEvent({
          type: 'userFailedSignIn'
        })
      }
    });
  }

  signUpUser(dto: DtoOutputSignUp) {
    this._authService.signUpUser(dto).subscribe({
      next: () => {
        this._router.navigate(['home/newsfeed'])
      },
      error: (err) => {
        this._eventBus.emitEvent({
          type: 'userFailedSignUp'
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

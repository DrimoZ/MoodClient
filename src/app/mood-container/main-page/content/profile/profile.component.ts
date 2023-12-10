import {Component, OnInit} from '@angular/core';
import {DtoInputUserProfile} from "../../../../Dtos/Users/Inputs/dto-input-user-profile";
import {EventBusService} from "../../../../Services/event-bus.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../Services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string = "-1";
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;

  profileData: DtoInputUserProfile = {
    description: "", friendCount: 0, login: "", name: "", publicationCount: 0, title: ""
  };

  constructor(private _eventBus: EventBusService, private _userService: UserService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.userId = params['id'];

      this._userService.getUserProfile(this.userId).subscribe({
        next: (user) => {
          this.profileData = user;
          this.isConnectedUser = user.isConnectedUser;
          this.isWaitingForApi = false;
        },
        error: (err) => {
          this.isWaitingForApi = false
          this.userId = "-1"
        }
      });

      this._eventBus.emitEvent({
        type: "userId",
        payload: this.userId
      })
    });
  }
}

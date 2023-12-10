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
  userLogin: string = "";
  hasLoadedData: boolean = false;
  isConnectedUser: boolean = false;

  profileData: DtoInputUserProfile = {
    description: "", friendCount: 0, login: "", name: "", publicationCount: 0, title: ""
  };

  constructor(private _eventBus: EventBusService, private _userService: UserService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.userLogin = params['id'];

      this._userService.getUserProfile(this.userLogin).subscribe({
        next: (user) => {
          this.profileData = user;
          this.isConnectedUser = user.isConnectedUser;
          this.hasLoadedData = true;
        },
        error: (err) => {
          console.log(err);
          if (err.status === 404) {
            this.userLogin = ""
          }
        }
      });
    });

    /*this._eventBus.onEvent().subscribe(event => {
      if (event.type === "userProfileData") {

        this.profileData.Login = event.payload.Login
        this.profileData.Name = event.payload.Name
        this.profileData.Title = event.payload.Title
        this.profileData.FriendCount = event.payload.FriendCount
        this.profileData.PublicationCount = event.payload.PublicationCount
        this.profileData.Description = event.payload.Description
      }
    })*/
  }
}

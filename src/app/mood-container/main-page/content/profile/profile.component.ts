import {Component, OnInit} from '@angular/core';
import {DtoInputUserProfile} from "../../../../Dtos/Users/Inputs/dto-input-user-profile";
import {EventBusService} from "../../../../Services/event-bus.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: DtoInputUserProfile = {
    Description: "",
    FriendCount: 0,
    Login: "",
    Name: "",
    PublicationCount: 0,
    Title: ""
  };

  constructor(private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._eventBus.onEvent().subscribe(event => {
      if (event.type === "userProfileData") {

        this.profileData.Login = event.payload.Login
        this.profileData.Name = event.payload.Name
        this.profileData.Title = event.payload.Title
        this.profileData.FriendCount = event.payload.FriendCount
        this.profileData.PublicationCount = event.payload.PublicationCount
        this.profileData.Description = event.payload.Description
      }
    })
  }
}

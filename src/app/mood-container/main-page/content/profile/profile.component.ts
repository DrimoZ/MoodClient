import {Component, OnInit} from '@angular/core';
import {DtoInputUserProfile} from "../../../../Dtos/Users/Inputs/dto-input-user-profile";
import {ActivatedRoute} from "@angular/router";
import {BehaviorEventBusService} from "../../../../Services/EventBus/behavior-event-bus.service";
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {ImageService} from "../../../../Services/ApiRequest/image.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string = "-1";
  isWaitingForApi: boolean = true;
  isConnectedUser: boolean = false;

  profileData: DtoInputUserProfile = <DtoInputUserProfile>{};

  constructor(private _behaviorEventBus: BehaviorEventBusService, private _userService: UserService,
              private _activatedRoute: ActivatedRoute, private _imageService: ImageService) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.userId = params['id'];

      this._userService.getUserProfile(this.userId).subscribe({
        next: (user) => {
          this.profileData = user;

          this._imageService.getImageData(this. profileData.idImage == null ? 0 : this.profileData.idImage).subscribe(url => {
            this.profileData.imageUrl = url;
          })

          this.isConnectedUser = user.isConnectedUser;
          this.isWaitingForApi = false;
        },
        error: (err) => {
          this.isWaitingForApi = false
          this.userId = "-1"
        }
      });

      this._behaviorEventBus.emitEvent({
        Type: "UserId",
        Payload: this.userId
      })
    });
  }
}

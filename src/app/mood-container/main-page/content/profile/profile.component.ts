import {Component, OnInit} from '@angular/core';
import {DtoInputUserProfile} from "../../../../Dtos/Users/Inputs/dto-input-user-profile";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorEventBusService} from "../../../../Services/EventBus/behavior-event-bus.service";
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {ImageService} from "../../../../Services/ApiRequest/image.service";
import {FriendService} from "../../../../Services/ApiRequest/friend.service";

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
              private _activatedRoute: ActivatedRoute, private _imageService: ImageService,
              private _router: Router, private _friendService: FriendService) {
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

  sendMessage(userId: string) {

  }

  emitAddFriend(friendId: string) {
    this._friendService.createFriendRequest(friendId).subscribe({
      next: (res) => {
        this.profileData.isFriendWithConnected = 0;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  emitRemoveFriend(friendId: string) {
    this._friendService.deleteFriend(friendId).subscribe({
      next: (res) => {
        this.profileData.isFriendWithConnected = -1;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  emitCancelFriend(friendId: string) {
    this._friendService.rejectFriendRequest(friendId).subscribe({
      next: (res) => {
        this.profileData.isFriendWithConnected = -1;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  updateProfilePicture(userId: string) {

  }

  emitIgnoreFriend(userId: string) {
    this._friendService.rejectFriendRequest(userId).subscribe({
      next: (res) => {
        this.profileData.isFriendWithConnected = -1;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  emitAcceptFriend(userId: string) {
    this._friendService.acceptFriendRequest(userId).subscribe({
      next: (res) => {
        this.profileData.isFriendWithConnected = 2;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}

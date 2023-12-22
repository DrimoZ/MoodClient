import {Component, OnDestroy, OnInit} from '@angular/core';
import {DtoInputUserProfile} from "../../../../Dtos/Users/Inputs/dto-input-user-profile";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorEventBusService} from "../../../../Services/EventBus/behavior-event-bus.service";
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {ImageService} from "../../../../Services/ApiRequest/image.service";
import {FriendService} from "../../../../Services/ApiRequest/friend.service";
import {ModalBusService, ModalEventName} from "../../../../Services/EventBus/modal-bus.service";
import {DtoInputUserStatus} from "../../../../Dtos/Users/Inputs/dto-input-user-status";
import {Subscription} from "rxjs";
import {EventBusService} from "../../../../Services/EventBus/event-bus.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  activeRouteSub: Subscription;
  eventSub: Subscription;

  profileData: DtoInputUserProfile = <DtoInputUserProfile>{};
  connectedUserStatus: DtoInputUserStatus;

  isWaitingForApi: boolean = true;

  constructor(private _behaviorEventBus: BehaviorEventBusService, private _userService: UserService,
              private _activatedRoute: ActivatedRoute, private _imageService: ImageService,
              private _friendService: FriendService, private _modalBus: ModalBusService, private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._userService.getConnectedUserStatus().subscribe(val => {
      this.connectedUserStatus = val;

      this.activeRouteSub = this._activatedRoute.params.subscribe(params => {
        this.profileData.userId = params['id'];

        this._userService.getUserProfile(this.profileData.userId).subscribe({
          next: user => {
            let id = this.profileData.userId;
            this.profileData = user;
            this.profileData.userId = id

            this._imageService.getImageData(this. profileData.imageId == null ? 0 : this.profileData.imageId).subscribe(url => {
              this.profileData.imageUrl = url;

              this.isWaitingForApi = false;
            })
          },
          error: () => {
            this.isWaitingForApi = false
            this.profileData.userId = "-1"
          }
        });

        this._behaviorEventBus.emitEvent({
          Type: "UserId",
          Payload: this.profileData.userId
        });
      });

      this.eventSub = this._eventBus.onEvent().subscribe(event => {
        if (event.Type === "ActionValidation") {
          if (event.Payload.modalId === "validateDeleteUser" && event.Payload.result) {
            this._userService.userDelete(this.profileData.userId).subscribe(() => {
              location.reload();
            })
          }
        }
      })
    })
  }

  ngOnDestroy() {
    console.log("destroyyy")
    this.activeRouteSub && this.activeRouteSub.unsubscribe();
    this.eventSub && this.eventSub.unsubscribe();
  }

  emitAddFriend(friendId: string) {
    this._friendService.createFriendRequest(friendId).subscribe(() => {
      this.profileData.isFriendWithConnected = 0;
    });
  }

  emitRemoveFriend(friendId: string) {
    this._friendService.deleteFriend(friendId).subscribe(() => {
      this.profileData.isFriendWithConnected = -1;
    });
  }

  emitCancelFriend(friendId: string) {
    this._friendService.rejectFriendRequest(friendId).subscribe(() => {
      this.profileData.isFriendWithConnected = -1;
    });
  }

  emitIgnoreFriend(userId: string) {
    this._friendService.rejectFriendRequest(userId).subscribe(() => {
      this.profileData.isFriendWithConnected = -1;
    });
  }

  emitAcceptFriend(userId: string) {
    this._friendService.acceptFriendRequest(userId).subscribe(() => {
      this.profileData.isFriendWithConnected = 2;
    });
  }

  updateProfilePicture() {
    this._modalBus.emitEvent({
      Type: ModalEventName.ProfilePictureEditionModal,
      Payload: {
        ModalId: "ppUpdate",
        AdditionalData: null
      }
    })
  }


  deleteUser() {
    this._modalBus.emitEvent({
      Type: ModalEventName.ActionValidationModal,
      Payload: {
        ModalId: "validateDeleteUser",
        AdditionalData: `Delete ${this.profileData.userName} Account - Irreversible Action`
      }
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {FriendService} from "../../../../../Services/ApiRequest/friend.service";
import {DtoInputOtherUser} from "../../../../../Dtos/Users/Inputs/dto-input-other-user";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";
import {DtoInputUserFriends} from "../../../../../Dtos/Users/Inputs/dto-input-user-friends";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  userProfileFriends: DtoInputUserFriends;
  userId: string = "";
  isWaitingForApi: boolean = true;

  isInputFocused: boolean = false;
  searchBarValue: any = "";

  constructor(private _userService: UserService, private _router: Router, private _friendService: FriendService, private _imageService: ImageService) {
  }

  ngOnInit(): void {
    this.userId = this._router.url.split("home")[1].split("/")[1];

    this._userService.getUserFriends(this.userId).subscribe({
      next: apiData => {
        this.userProfileFriends = apiData;

        if (this.userProfileFriends.friends  != null) {
          this.userProfileFriends.friends.forEach(friend => {
            this._imageService.getImageData(friend.imageId == null ? 0 : friend.imageId).subscribe(url => {
              friend.imageUrl = url;
            })
          })
        }

        this.isWaitingForApi = false;
      },
      error: (err) => {
        console.log(err);
        if (err.status === 404) {
          this.userId = "-1"
          this.isWaitingForApi = false;
        }
      }
    })
  }

  filterFriends(friends: DtoInputOtherUser[], searchTerm: string): DtoInputOtherUser[] {
    if (friends == undefined) return [];

    return friends.filter(friend =>
      friend.userName.toLowerCase().includes(searchTerm.toLowerCase()) || friend.userLogin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  viewFriendProfile(userId: string) {
    this._router.navigate(['home/' + userId])
  }

  emitAddFriend(friendId: string) {
    this._friendService.createFriendRequest(friendId).subscribe({
      next: (res) => {
        let friendIndex = this.userProfileFriends.friends.findIndex(f => f.userId == friendId);
        this.userProfileFriends.friends[friendIndex].isFriendWithConnected = 0;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  emitRemoveFriend(friendId: string) {
    this._friendService.deleteFriend(friendId).subscribe({
      next: (res) => {
        let friendIndex = this.userProfileFriends.friends.findIndex(f => f.userId == friendId);
        this.userProfileFriends.friends[friendIndex].isFriendWithConnected = -1;
        this.userProfileFriends.friends.splice(friendIndex, 1)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  emitPendingFriend(friendId: string) {
    this._router.navigate(['home/notifications'])
  }

  emitCancelFriend(friendId: string) {
    this._friendService.rejectFriendRequest(friendId).subscribe({
      next: (res) => {
        let friendIndex = this.userProfileFriends.friends.findIndex(f => f.userId == friendId);
        this.userProfileFriends.friends[friendIndex].isFriendWithConnected = -1;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}

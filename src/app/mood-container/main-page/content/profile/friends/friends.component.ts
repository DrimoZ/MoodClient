import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {FriendService} from "../../../../../Services/ApiRequest/friend.service";
import {DtoInputOtherUser} from "../../../../../Dtos/Users/Inputs/dto-input-other-user";
import {ImageService} from "../../../../../Services/ApiRequest/image.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  userId: string = "";
  isWaitingForApi: boolean = true;

  isInputFocused: boolean = false;
  searchBarValue: any = "";

  userFriends: DtoInputOtherUser[] = [];
  isConnectedUser: boolean = false;
  isFriendPublic: boolean = false;

  constructor(private _userService: UserService, private _router: Router, private _friendService: FriendService, private _imageService: ImageService) {
  }

  ngOnInit(): void {
    this.userId = this._router.url.split("home")[1].split("/")[1];

    this._userService.getUserFriends(this.userId).subscribe({
      next: (user) => {

        this.userFriends = user.friends;
        this.isConnectedUser = user.isConnectedUser;
        this.isFriendPublic = user.isFriendPublic;

        this.userFriends.forEach(friend => {
          this._imageService.getImageData(friend.idImage == null ? -1 : friend.idImage).subscribe(url => {
            friend.imageUrl = url;
          })
        })

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

  filterFriends(friends: DtoInputOtherUser[], searchTerm: string): any[] {
    if (friends == undefined) return [];

    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || friend.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  viewFriendProfile(userId: string) {
    this._router.navigate(['home/' + userId])
  }

  emitAddFriend(friendId: string) {
    this._friendService.createFriendRequest(friendId).subscribe({
      next: (res) => {
        let friendIndex = this.userFriends.findIndex(f => f.id == friendId);
        this.userFriends[friendIndex].isFriendWithConnected = 0;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  emitRemoveFriend(friendId: string) {
    this._friendService.deleteFriend(friendId).subscribe({
      next: (res) => {
        let friendIndex = this.userFriends.findIndex(f => f.id == friendId);
        this.userFriends[friendIndex].isFriendWithConnected = -1;
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
        let friendIndex = this.userFriends.findIndex(f => f.id == friendId);
        this.userFriends[friendIndex].isFriendWithConnected = -1;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}

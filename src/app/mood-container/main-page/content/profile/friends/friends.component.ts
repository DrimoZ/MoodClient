import {Component, OnInit} from '@angular/core';
import {DtoInputOtherUser} from "../../../../../Dtos/Users/Inputs/dto-input-other-user";
import {Router} from "@angular/router";
import {UserService} from "../../../../../Services/ApiRequest/user.service";

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

  constructor(private _userService: UserService, private _router: Router) {
  }

  ngOnInit(): void {
    this.userId = this._router.url.split("home")[1].split("/")[1];

    this._userService.getUserFriends(this.userId).subscribe({
      next: (user) => {
        console.log(user);

        this.userFriends = user.friends;
        this.isConnectedUser = user.isConnectedUser;
        this.isFriendPublic = user.isFriendPublic;

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

  emitRemoveFriend(friend: DtoInputOtherUser) {

  }

  emitAddFriend(friend: DtoInputOtherUser) {

  }

  viewFriendProfile(userId: string) {
    this._router.navigate(['home/' + userId])
  }


}

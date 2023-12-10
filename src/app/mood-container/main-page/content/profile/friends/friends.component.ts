import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../../../../Services/event-bus.service";
import {UserService} from "../../../../../Services/user.service";
import {DtoInputUserFriend} from "../../../../../Dtos/Users/Inputs/dto-input-user-friend";
import {Router} from "@angular/router";

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

  userFriends: DtoInputUserFriend[] = [];
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

  filterFriends(friends: DtoInputUserFriend[], searchTerm: string): any[] {
    if (friends == undefined) return [];

    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || friend.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  emitRemoveFriend(friend: DtoInputUserFriend) {

  }

  emitAddFriend(friend: DtoInputUserFriend) {

  }

  viewFriendProfile(userId: string) {
    this._router.navigate(['home/' + userId])
  }


}

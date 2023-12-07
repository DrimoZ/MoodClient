import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../../../../Services/event-bus.service";
import {UserService} from "../../../../../Services/user.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private _userLogin: string = "";
  isInputFocused: boolean = false;
  searchBarValue: any = "";
  data: any;

  constructor(private _dataService: UserService, private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._dataService.getUserFriends().subscribe(
      data => {
        this._userLogin = data.login;

        this._eventBus.emitEvent({
          type: "userProfileData",
          payload: {
            Login: data.login,
            Name: data.name,
            Title: data.title,
            Description: data.account.description,
            FriendCount: data.friendCount,
            PublicationCount: data.publicationCount,
          }
        })

        this.data = data.friends;
      }
    )
  }

  filterFriends(friends: any[], searchTerm: string): any[] {
    if (friends == undefined) return [];

    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || friend.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  emitRemoveFriend(friend: any) {
    this._eventBus.emitEvent({
      type: "userProfileRemoveFriend",
      payload: {
        userLogin: this._userLogin,
        friendToDelete: friend
      }
    })
  }
}

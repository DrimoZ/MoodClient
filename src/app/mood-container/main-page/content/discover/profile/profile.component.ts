import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {BehaviorEventBusService} from "../../../../../Services/EventBus/behavior-event-bus.service";
import {DtoInputOtherUser} from "../../../../../Dtos/Users/Inputs/dto-input-other-user";
import {Router} from "@angular/router";
import {FriendService} from "../../../../../Services/ApiRequest/friend.service";

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../discover.component.css']
})
export class ProfileComponent implements OnInit{
  searchBarValue: string = "";
  otherUsers: DtoInputOtherUser[] = [];
  showCount: number = 10;

  constructor(private _dataService: UserService, private _behaviorEventBus: BehaviorEventBusService,
              private _router: Router, private _friendService: FriendService) {
  }

  filterUsers(discoverUsers: DtoInputOtherUser[], searchTerm: string): any[] {
    if (discoverUsers == undefined) return [];

    return discoverUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  ngOnInit(): void {
    this._behaviorEventBus.onEvent().subscribe(event => {
      if (event.Type === 'DiscoverSearch') {
        this.searchBarValue = event.Payload;
      }
    })

    this._dataService.getUsers(this.showCount).subscribe(
      data => {
        this.otherUsers = data;
      }
    )
  }

  viewUserProfile(userId: string) {
    this._router.navigate(['home/' + userId])
  }

  emitAddFriend(friendId: string) {
    this._friendService.createFriendRequest(friendId).subscribe({
      next: (res) => {
        let friendIndex = this.otherUsers.findIndex(f => f.id == friendId);
        this.otherUsers[friendIndex].isFriendWithConnected = 0;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  emitRemoveFriend(friendId: string) {
    this._friendService.deleteFriend(friendId).subscribe({
      next: (res) => {
        let friendIndex = this.otherUsers.findIndex(f => f.id == friendId);
        this.otherUsers[friendIndex].isFriendWithConnected = -1;
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
        let friendIndex = this.otherUsers.findIndex(f => f.id == friendId);
        this.otherUsers[friendIndex].isFriendWithConnected = -1;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}

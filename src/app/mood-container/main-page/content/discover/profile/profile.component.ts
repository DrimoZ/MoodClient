import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../../Services/ApiRequest/user.service";
import {BehaviorEventBusService} from "../../../../../Services/EventBus/behavior-event-bus.service";
import {DtoInputOtherUser} from "../../../../../Dtos/Users/Inputs/dto-input-other-user";

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  searchBarValue: string = "";
  data: DtoInputOtherUser[] = [];

  constructor(private _dataService: UserService, private _behaviorEventBus: BehaviorEventBusService) {
  }
  filterUsers(discoverUsers: DtoInputOtherUser[], searchTerm: string): any[] {
    if (discoverUsers == undefined) return [];

    return discoverUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  emitAddFriend(friend: any) {

  }

  emitRemoveFriend(friend: any) {

  }

  ngOnInit(): void {
    this._behaviorEventBus.onEvent().subscribe(event => {
      if (event.Type === 'DiscoverSearch') {
        this.searchBarValue = event.Payload;
      }
    })

    this._dataService.getUsers().subscribe(
      data => {
        this.data = data;
      }
    )
  }

  isFriend(user: any): boolean {
    return false;
  }
}

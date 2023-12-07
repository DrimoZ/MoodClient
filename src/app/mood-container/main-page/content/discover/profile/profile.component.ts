import {Component, OnInit} from '@angular/core';
import {DataAccessorService} from "../../../../../Services/data-accessor.service";
import {EventBusService} from "../../../../../Services/event-bus.service";

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  searchBarValue: any = "";
  data: any;

  constructor(private _dataService: DataAccessorService, private _eventBus: EventBusService) {
  }
  filterUsers(users: any[], searchTerm: string): any[] {
    return users;
  }

  emitAddFriend(friend: any) {
    this._eventBus.emitEvent({
      type: "userProfileAddFriend",
      payload: {
        friendToAdd: friend
      }
    })
  }

  emitRemoveFriend(friend: any) {
    this._eventBus.emitEvent({
      type: "userProfileRemoveFriend",
      payload: {
        friendToDelete: friend
      }
    })
  }

  ngOnInit(): void {
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

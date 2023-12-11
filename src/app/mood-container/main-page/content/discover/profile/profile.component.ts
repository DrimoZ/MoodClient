import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../Services/ApiRequest/user.service";

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  searchBarValue: any = "";
  data: any;

  constructor(private _dataService: UserService) {
  }
  filterUsers(users: any[], searchTerm: string): any[] {
    return users;
  }

  emitAddFriend(friend: any) {

  }

  emitRemoveFriend(friend: any) {

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

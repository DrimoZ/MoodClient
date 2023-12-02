import {Component, OnInit} from '@angular/core';
import {DataAccessorService} from "../../../../../Services/data-accessor.service";
import {EventBusService} from "../../../../../Services/event-bus.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  data: any;

  constructor(private _dataService: DataAccessorService, private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._dataService.getUserAccount().subscribe(
      data => {
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

}

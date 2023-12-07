import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../../../../Services/event-bus.service";
import {UserService} from "../../../../../Services/user.service";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit{
  data: any;

  constructor(private _dataService: UserService, private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._dataService.getUserPublications().subscribe(
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

        this.data = data.publications;
      }
    )
  }

}

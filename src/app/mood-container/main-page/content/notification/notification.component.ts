import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {DtoInputNotification} from "../../../../Dtos/Users/Inputs/dto-input-notification";
import {ImageService} from "../../../../Services/ApiRequest/image.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notifications: DtoInputNotification[];
  isWaitingForApi: boolean = true;


  constructor(private _router: Router, private _userService: UserService, private _imageService: ImageService) {}
  ngOnInit(): void {
    this._userService.getNotifications().subscribe(res => {
      this.notifications = res;

      this.notifications.forEach(n => {
        this._imageService.getImageData(n.imageId == null  ? 0 : n.imageId).subscribe(val => {
          n.imageUrl = val;
        })
      })

      this.isWaitingForApi = false;
    })
  }

  viewUserProfile(userId: string): void {
    this._router.navigate(["home/" + userId]);
  }

  calculatedDate(givenDate: Date): string {
    const currentDate = new Date();
    givenDate = new Date(givenDate);
    let differenceInMs = currentDate.getTime() - givenDate.getTime();

    let seconds = Math.floor(differenceInMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} y`;
    } else if (days > 0) {
      return `${days} d`;
    } else if (hours > 0) {
      return `${hours} h`;
    } else if (minutes > 0) {
      return `${minutes} m`;
    } else {
      return `${seconds} s`;
    }
  }
}

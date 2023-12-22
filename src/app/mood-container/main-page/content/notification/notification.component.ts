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

}

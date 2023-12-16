import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {DtoInputUserPrivacy} from "../../../../Dtos/Users/Inputs/dto-input-user-privacy";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css', '../../../../../assets/css/custom/userprofile.css']
})
export class ParametersComponent implements OnInit {
  clickedDiv: string = "account";
  isWaitingForApi: boolean = true;

  settings: DtoInputUserPrivacy;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getUserPrivacySettings().subscribe(settings => {
      this.settings = settings;

      if (!this.settings.isPublic) {
        this.settings.isFriendPublic = false;
        this.settings.isPublicationPublic = false;
      }

      this.isWaitingForApi = false;
    })
  }


  deleteAccount() {

  }

  setAccountPrivacy() {
    if (!this.settings.isPublic) {
      this.settings.isFriendPublic = false;
      this.settings.isPublicationPublic = false;
    } else {
      this.settings.isFriendPublic = true;
      this.settings.isPublicationPublic = true;
    }

    this.setFriendsPrivacy()
    this.setPublicationsPrivacy()

    const patch = {  path: "isPublic", value: this.settings.isPublic };
    this._userService.patchUserProfile(patch).subscribe({
      next: () => {
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  setFriendsPrivacy() {
    const patch = {  path: "isFriendPublic", value: this.settings.isFriendPublic };
    this._userService.patchUserProfile(patch).subscribe({
      next: () => {
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  setPublicationsPrivacy() {
    const patch = {  path: "isPublicationPublic", value: this.settings.isPublicationPublic };
    this._userService.patchUserProfile(patch).subscribe({
      next: () => {
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onDivClick(divName: string) {
    this.clickedDiv = divName
  }
}

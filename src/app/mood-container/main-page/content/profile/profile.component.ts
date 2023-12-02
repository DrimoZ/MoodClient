import {Component, OnInit} from '@angular/core';
import {DataRecoveryService} from "../../../../Services/data-recovery.service";
import {DtoInputProfile} from "../../../../Dtos/Users/Inputs/dto-input-profile";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  dataModel: DtoInputProfile = {
    Account: {BirthDate: "", Description: "", PhoneNumber: ""},
    FriendCount: 0,
    Login: "",
    Name: "",
    PublicationCount: 0,
    Title: ""
  };

  constructor(private _dataService: DataRecoveryService) {
  }

  ngOnInit(): void {
    this._dataService.getUserProfileBase().subscribe(
      data => {
        this.dataModel.Login = data.user.login
        this.dataModel.Name = data.user.name
        this.dataModel.Title = data.user.title
        this.dataModel.FriendCount = data.user.friendCount
        this.dataModel.PublicationCount = data.user.publicationCount
        this.dataModel.Account.Description = data.user.account.description
        this.dataModel.Account.PhoneNumber = data.user.account.phoneNumber
        this.dataModel.Account.BirthDate = data.user.account.birthDate
      }
    )
  }

}

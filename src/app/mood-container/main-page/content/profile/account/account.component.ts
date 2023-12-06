import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../../../../Services/event-bus.service";
import {DtoInputUserAccount} from "../../../../../Dtos/Users/Inputs/dto-input-user-account";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataAccessorService} from "../../../../../Services/data-accessor.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isPublicDataEditing: boolean = false;

  data: DtoInputUserAccount = {
    Id: "",
    Login: "",
    Name: "",

    Title: "",
    Description: "",
    BirthDate: "",

    Mail: "",
    PhoneNumber: ""
  };

  commonInfoForm: FormGroup = this._fb.group({
    Login: [{value: "", disabled: true}, [Validators.required, Validators.minLength(6), Validators.maxLength(48)]],
    Name: [{value: "", disabled: true}, [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
    Title: [{value: "", disabled: true}, [Validators.required]],
    Description: [{value: "", disabled: true}, [Validators.required]],
    BirthDate: [{value: "", disabled: true}, [Validators.required]],
  })



  constructor(private _dataService: DataAccessorService, private _eventBus: EventBusService, private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._dataService.getUserAccount().subscribe(
      data => {
        console.log(data);

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

        this.data.Id = data.id;

        this.data.Login = data.login;
        this.data.Name = data.name;
        this.data.Title = data.title;
        this.data.Description = data.account.description;
        this.data.BirthDate = data.account.birthDate.split("T")[0];

        this.data.Mail = data.mail;
        this.data.PhoneNumber = data.account.phoneNumber;

        console.log(this.data);
      }
    )
  }

  cancelCommonEdit() {
    this.isPublicDataEditing = false;

    this.controlLogin.disable();
    this.controlLogin.setValue(this.data.Login);

    this.controlName.disable();
    this.controlName.setValue(this.data.Name);

    this.controlDescription.disable();
    this.controlDescription.setValue(this.data.Description);

    this.controlBirthDate.disable();
    this.controlBirthDate.setValue(this.data.BirthDate);

    this.controlTitle.disable();
    this.controlTitle.setValue(this.data.Title);
  }

  editCommonEdit() {
    this.isPublicDataEditing = true;

    this.controlLogin.setValue(this.data.Login);
    this.controlLogin.enable();
    this.controlName.setValue(this.data.Name);
    this.controlName.enable();
    this.controlDescription.setValue(this.data.Description);
    this.controlDescription.enable();
    this.controlBirthDate.setValue(this.data.BirthDate);
    this.controlBirthDate.enable();
    this.controlTitle.setValue(this.data.Title);
    this.controlTitle.enable();
  }

  commitCommonEdit() {
    this.isPublicDataEditing = false;

    this.controlLogin.disable();
    this.controlName.disable();
    this.controlDescription.disable();
    this.controlBirthDate.disable();
    this.controlTitle.disable();
  }

  get controlLogin(): AbstractControl {
    return this.commonInfoForm.controls['Login'];
  }
  get controlName(): AbstractControl {
    return this.commonInfoForm.controls['Name'];
  }
  get controlDescription(): AbstractControl {
    return this.commonInfoForm.controls['Description'];
  }
  get controlBirthDate(): AbstractControl {
    return this.commonInfoForm.controls['BirthDate'];
  }
  get controlTitle(): AbstractControl {
    return this.commonInfoForm.controls['Title'];
  }
}

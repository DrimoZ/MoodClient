import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../../../../Services/event-bus.service";
import {DtoInputUserAccount} from "../../../../../Dtos/Users/Inputs/dto-input-user-account";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../Services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userId: string = "-1";
  isWaitingForApi: boolean = true;
  isPublicDataEditing: boolean = false;

  accountData: DtoInputUserAccount = {
    birthDate: "", description: "", login: "", mail: "", name: "", phoneNumber: "", title: ""
  };

  commonInfoForm: FormGroup = this._fb.group({
    Mail: [{value: "", disabled: true}, [Validators.required, Validators.email]],
    Name: [{value: "", disabled: true}, [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
    Title: [{value: "", disabled: true}, [Validators.required, Validators.maxLength(32)]],
    Description: [{value: "", disabled: true}, [Validators.required, Validators.maxLength(255)]],
    BirthDate: [{value: "", disabled: true}, [Validators.required]],
  })



  constructor(private _dataService: UserService, private _fb: FormBuilder) {

  }

  ngOnInit(): void {
    this._dataService.getUserIdAndRole().subscribe({
      next: (usr) => {
        this.userId = usr.userId;

        this._dataService.getUserAccount(this.userId).subscribe({
          next: (user) => {
            this.accountData = user;
            this.accountData.birthDate = this.accountData.birthDate.split("T")[0]
            this.isWaitingForApi = false;

            this.controlDescription.setValue(this.accountData.description)
            this.controlMail.setValue(this.accountData.mail)
            this.controlTitle.setValue(this.accountData.title)
            this.controlName.setValue(this.accountData.name)
            this.controlBirthDate.setValue(this.accountData.birthDate)
          },
          error: (err) => {
            console.log(err);
            if (err.status === 404) {
              this.userId = "-1"
              this.isWaitingForApi = false;
            }
          }
        })
      },
      error: (err) => {
        console.log(err)
        this.userId = "-1"
        this.isWaitingForApi = false;
      }
    })



  }

  cancelCommonEdit() {
    this.isPublicDataEditing = false;

    this.controlMail.disable();
    this.controlMail.setValue(this.accountData.mail);

    this.controlName.disable();
    this.controlName.setValue(this.accountData.name);

    this.controlDescription.disable();
    this.controlDescription.setValue(this.accountData.description);

    this.controlBirthDate.disable();
    this.controlBirthDate.setValue(this.accountData.birthDate);

    this.controlTitle.disable();
    this.controlTitle.setValue(this.accountData.title);
  }

  editCommonEdit() {
    this.isPublicDataEditing = true;

    this.controlMail.setValue(this.accountData.mail);
    this.controlMail.enable();
    this.controlName.setValue(this.accountData.name);
    this.controlName.enable();
    this.controlDescription.setValue(this.accountData.description);
    this.controlDescription.enable();
    this.controlBirthDate.setValue(this.accountData.birthDate);
    this.controlBirthDate.enable();
    this.controlTitle.setValue(this.accountData.title);
    this.controlTitle.enable();
  }

  commitCommonEdit() {
    this.isPublicDataEditing = false;
    this.isWaitingForApi = true;

    this.controlMail.disable();
    this.controlName.disable();
    this.controlDescription.disable();
    this.controlBirthDate.disable();
    this.controlTitle.disable();

    this._dataService.updateUserAccount(
      {
        Birthdate: this.controlBirthDate.value,
        Description: this.controlDescription.value,
        Id: this.userId,
        Mail: this.controlMail.value,
        Name: this.controlName.value,
        Title: this.controlTitle.value
      }
    ).subscribe({
      next: (res) => {
        location.reload()
      },
      error: (err) => {
        console.log(err)
        this.controlMail.setValue(this.accountData.mail);
        this.controlName.setValue(this.accountData.name);
        this.controlDescription.setValue(this.accountData.description);
        this.controlBirthDate.setValue(this.accountData.birthDate);
        this.controlTitle.setValue(this.accountData.title);
      }
    })
  }

  get controlMail(): AbstractControl {
    return this.commonInfoForm.controls['Mail'];
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

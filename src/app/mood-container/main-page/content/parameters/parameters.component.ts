import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../Services/ApiRequest/user.service";
import {DtoInputUserPrivacy} from "../../../../Dtos/Users/Inputs/dto-input-user-privacy";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputUserUpdatePassword} from "../../../../Dtos/Users/Outputs/dto-output-user-update-password";
import {ModalBusService, ModalEventName} from "../../../../Services/EventBus/modal-bus.service";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css'],
})
export class ParametersComponent implements OnInit {
  clickedDiv: string = "account";
  isWaitingForApi: boolean = true;

  isPasswordEdited = 0;

  settings: DtoInputUserPrivacy;


  passwordForm: FormGroup = this._fb.group({
    OldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\[{\]};:<>|.\/?,-]).+$/)]],
    NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\[{\]};:<>|.\/?,-]).+$/)]],
    PasswordConfirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\[{\]};:<>|.\/?,-]).+$/)]],
  })

  constructor(private _userService: UserService, private _fb: FormBuilder, private _modalBus: ModalBusService) {
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

  get controlOldPassword(): AbstractControl {
    return this.passwordForm.controls['OldPassword'];
  }
  get controlNewPassword(): AbstractControl {
    return this.passwordForm.controls['NewPassword'];
  }
  get controlPasswordConfirmation(): AbstractControl {
    return this.passwordForm.controls['PasswordConfirmation'];
  }

  checkNewPassword(password: string, type: number): boolean
  {
    switch (type)
    {
      case 0: return RegExp('.{8,}').test(password);
      case 1: return RegExp('(?=.*[0-9])').test(password);
      case 2: return RegExp('(?=.*[A-Z])').test(password);
      case 3: return RegExp('(?=.*[a-z])').test(password);
      case 4: return RegExp(/^(?=.*[!@#$%^&*()_+=\[{\]};:<>|.\\\/?,-]).+$/).test(password);
      default: return false;
    }
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

  cancelPasswordReset() {
    this.passwordForm.reset()
  }

  commitPasswordReset() {
    if(this.controlNewPassword.value != this.controlPasswordConfirmation.value) return;

    let dto: DtoOutputUserUpdatePassword = {
      newPassword: this.controlNewPassword.value,
      oldPassword: this.controlOldPassword.value
    };

    this.passwordForm.reset();

    this._userService.updateUserPassword(dto).subscribe({
      next: () => {
        this.isPasswordEdited = 1;

        setTimeout(() => {
          this.isPasswordEdited = 0;
        }, 20000)
      },
      error: () => {
        this.isPasswordEdited = -1;

        setTimeout(() => {
          this.isPasswordEdited = 0;
        }, 20000)
      }
    });
  }

  deleteAccount() {
    this._modalBus.emitEvent({
      Type: ModalEventName.AccountDeletionModal,
      Payload: {
        ModalId: "accountDeletion",
        AdditionalData: null
      }
    })
  }
}

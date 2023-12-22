import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventBusService} from "../../Services/EventBus/event-bus.service";
import {AuthenticationService} from "../../Services/ApiRequest/authentication.service";
import {Router} from "@angular/router";
import {DtoOutputUserUpdatePassword} from "../../Dtos/Users/Outputs/dto-output-user-update-password";
import {DtoOutputUserSignUp} from "../../Dtos/Users/Outputs/dto-output-user-sign-up";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {
  showError: boolean = false;

  registerForm: FormGroup = this._fb.group({
    Name: ['', [Validators.required]],
    Login: ['', [Validators.required]],
    Mail: ['', [Validators.required, Validators.email]],
    Birthdate: ['', [Validators.required]],
    Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\[{\]};:<>|.\/?,-]).+$/)]],
    PasswordConfirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\[{\]};:<>|.\/?,-]).+$/)]],
  })

  errorValue: string;


  constructor(private _fb: FormBuilder, private _authService: AuthenticationService, private _router: Router) {
  }

  get controlName(): AbstractControl {
    return this.registerForm.controls['Name'];
  }
  get controlLogin(): AbstractControl {
    return this.registerForm.controls['Login'];
  }
  get controlMail(): AbstractControl {
    return this.registerForm.controls['Mail'];
  }
  get controlBirthdate(): AbstractControl {
    return this.registerForm.controls['Birthdate'];
  }
  get controlPassword(): AbstractControl {
    return this.registerForm.controls['Password'];
  }
  get controlPasswordConfirmation(): AbstractControl {
    return this.registerForm.controls['PasswordConfirmation'];
  }

  submitForm() {
    this.showError = false;

    let dto: DtoOutputUserSignUp = {
      UserName: this.controlName.value,
      UserLogin: this.controlLogin.value,
      UserMail: this.controlMail.value,
      AccountBirthdate: this.controlBirthdate.value,
      UserPassword: this.controlPassword.value
    };

    this._authService.signUpUser(dto).subscribe({
      next: () => {
        this._router.navigate(['home/newsfeed'])
      },
      error: (err) => {
        this.controlPassword.setValue("");
        this.controlPasswordConfirmation.setValue("");

        if (err.status === 500) {
          this.errorValue = err.error.split("System.ArgumentException: ")[1].split("at Appl")[0];
        }
        else {
          let error: any = Object.values(err.error.errors)[0];
          this.errorValue = error[0];
        }

        this.showError = true;
      }
    });
  }

  checkPassword(password: string, type: number): boolean
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
}

import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputUserSignIn} from "../../Dtos/Users/Outputs/dto-output-user-sign-in";
import {AuthenticationService} from "../../Services/ApiRequest/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  showError: boolean = false;

  loginForm: FormGroup = this._fb.group({
    Login: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(48)]],
    Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48)]],
    StayLoggedIn: [false]
  })

  constructor(private _fb: FormBuilder, private _authService: AuthenticationService, private _router: Router) {
  }

  get controlLogin(): AbstractControl {
    return this.loginForm.controls['Login'];
  }
  get controlPassword(): AbstractControl {
    return this.loginForm.controls['Password'];
  }
  get controlStayLoggedIn(): AbstractControl {
    return this.loginForm.controls['StayLoggedIn'];
  }

  submitForm() {
    this.showError = false;

    let dto: DtoOutputUserSignIn = {
      UserLogin: this.controlLogin.value,
      UserPassword: this.controlPassword.value,
      StayLoggedIn: this.controlStayLoggedIn.value
    }

    this._authService.signInUser(dto).subscribe({
      next: () => {
        this._router.navigate(['home/newsfeed'])
      },
      error: () => {
        this.controlPassword.setValue("");
        this.showError = true;
      }
    });
  }
}

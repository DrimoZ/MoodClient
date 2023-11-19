import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventBusService} from "../../Services/event-bus.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup = this._fb.group({
    Login: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48)]],
    Password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(48)]],
    StayLoggedIn: [false]
  })

  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) {
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
    this._eventBus.emitEvent({
      type: 'userSignIn',
      payload: {
        Login: this.controlLogin.value,
        Password: this.controlPassword.value,
        StayLoggedIn: this.controlStayLoggedIn.value
      }
    })
  }
}

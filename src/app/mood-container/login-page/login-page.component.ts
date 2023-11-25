import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventBusService} from "../../Services/event-bus.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  showFirstError: boolean = false;
  showSecondError: boolean = false;

  loginForm: FormGroup = this._fb.group({
    Login: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48)]],
    Password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(48)]],
    StayLoggedIn: [false]
  })

  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._eventBus.onEvent().subscribe(event => {
      if (event.type === "userFailedSignIn") {
        this.controlPassword.setValue("");

        if (event.payload.err.error.message === "404NotFound") {
          this.controlLogin.setValue("");
          this.showFirstError = true;
          this.showSecondError = false;
        }
        else {
          this.showFirstError = false;
          this.showSecondError = true;
        }
      }
    });
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
    this.showFirstError = false;
    this.showSecondError = false;

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

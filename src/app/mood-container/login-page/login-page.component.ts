import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoOutputSignIn} from "../../Dtos/dto-output-signin";

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

  constructor(private _router: Router, private _fb: FormBuilder) {
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



  submitForm(event: Event) {



    // this._router.navigate(['../main']);
  }
}

import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoOutputSignIn} from "../../Dtos/dto-output-signin";
import {ToFormControl} from "../../Utils/toformcontrol";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  form: FormGroup = this._fb.group({
    Login: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    StayLoggedIn: [false]
  })

  constructor(private _router: Router, private _fb: FormBuilder) {
  }

  submitForm() {
    this._router.navigate(['../main']);
  }
}

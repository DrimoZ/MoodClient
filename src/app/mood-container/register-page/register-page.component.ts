import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventBusService} from "../../Services/event-bus.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {
  registerForm: FormGroup = this._fb.group({
    Name: ['', [Validators.required]],
    Login: ['', [Validators.required]],
    Mail: ['', [Validators.required, Validators.email]],
    Birthdate: ['', [Validators.required]],
    Password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(48)]],
    PasswordConfirmation: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(48)]],
  })

  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) {
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
    this._eventBus.emitEvent({
      type: 'userSignUp',
      payload: {
      }
    })
  }
}

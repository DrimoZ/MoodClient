import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventBusService} from "../../Services/event-bus.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  showError: boolean = false;

  registerForm: FormGroup = this._fb.group({
    Name: ['', [Validators.required]],
    Login: ['', [Validators.required]],
    Mail: ['', [Validators.required, Validators.email]],
    Birthdate: ['', [Validators.required]],
    Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48),
      Validators.pattern("[0-9]+|[A-Z]+|[a-z]+|.{8,}|[!@#$%^&*()_+=\[{\]};:<>|./?,-]")]],
    PasswordConfirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48),
      Validators.pattern("[0-9]+|[A-Z]+|[a-z]+|.{8,}|[!@#$%^&*()_+=\[{\]};:<>|./?,-]")]],
  })


  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._eventBus.onEvent().subscribe(event => {
      if (event.type === "userFailedSignUp") {
        this.controlPassword.setValue("");
        this.controlPasswordConfirmation.setValue("");
        this.showError = true;
      }
    });
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

    this._eventBus.emitEvent({
      type: 'userSignUp',
      payload: {
        Name: this.controlName.value,
        Login: this.controlLogin.value,
        Mail: this.controlMail.value,
        Birthdate: this.controlBirthdate.value,
        Password: this.controlPassword.value
      }
    })
  }
}

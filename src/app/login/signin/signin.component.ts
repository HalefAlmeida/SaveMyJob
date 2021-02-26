import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit() {
    this.auth.login(this.loginForm.value['email'], this.loginForm.value['password'])
  }

  getErrorMessage(control) {
    return this.handler.getErrorMessage(this.loginForm, control)
  }

}

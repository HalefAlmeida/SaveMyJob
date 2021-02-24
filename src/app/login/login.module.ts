import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SigninComponent } from './signin/signin.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [LoginComponent, SigninComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule
  ]
})
export class LoginModule { }

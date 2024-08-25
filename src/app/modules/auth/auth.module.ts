import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { FormLoginComponent } from './pages/login/form-login/form-login.component';
import { FormCreateAccountComponent } from './pages/create-account/form-create-account/form-create-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    FormLoginComponent,
    FormCreateAccountComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class AuthModule { }

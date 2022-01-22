import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationInterceptor} from "./services/authentication.interceptor";
import { MachineListComponent } from './machine-list/machine-list.component';
import { CreateMachineComponent } from './create-machine/create-machine.component';
import { ErrorLogComponent } from './error-log/error-log.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    EditUserComponent,
    LoginComponent,
    UserListComponent,
    HomeComponent,
    MachineListComponent,
    CreateMachineComponent,
    ErrorLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

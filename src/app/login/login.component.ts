import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Login} from "../interfaces/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  welcome: boolean;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
    this.formGroup = new FormGroup({
    });
    this.welcome = false;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email_input: ['', Validators.email],
      password_input: ['', Validators.required]
    });
  }

  get email(): string {
    return this.formGroup.get('email_input')?.value;
  }

  get password(): string {
    return this.formGroup.get('password_input')?.value;
  }

  get identifier(): string {
    return this.authenticationService.getIdentifier;
  }

  authenticate(): void {
    if(this.formGroup.invalid) {
      alert("Please fill in the fields correctly.");
      return;
    }
    let login: Login = {
      email: this.email,
      password: this.password
    };
    this.authenticationService.obtainAuthentication(login).subscribe((() => {
      this.welcome = true;
    }));
  }

}

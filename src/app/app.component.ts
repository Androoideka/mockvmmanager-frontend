import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'domaci3fe-agasic218rn';

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  get authenticated() {
    return this.authenticationService.authenticated;
  }

  get identifier() {
    return this.authenticationService.identifier;
  }

  get can_create_users() {
    return this.authenticationService.can_create_users;
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['']);
  }
}

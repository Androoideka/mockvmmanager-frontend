import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'domaci3fe-agasic218rn';

  constructor(private authenticationService: AuthenticationService) {
  }

  get isAuthenticated() {
    return this.authenticationService.isAuthenticated;
  }

  get identifier() {
    return this.authenticationService.getIdentifier;
  }

  get can_create_users() {
    return this.authenticationService.getPermissions.can_create_users;
  }

  logOut() {
    this.authenticationService.logOut();
  }
}

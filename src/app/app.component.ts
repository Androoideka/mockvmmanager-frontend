import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService } from './services/authentication.service';
import {PERMISSION_REPRESENTATIONS} from "./model/permission-model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nwpprojekatfe-agasic218rn';

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
    return this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[0]];
  }

  get can_search_machines() {
    return this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[4]];
  }

  get can_create_machines() {
    return this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[8]];
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['']).then(() => {});
  }
}

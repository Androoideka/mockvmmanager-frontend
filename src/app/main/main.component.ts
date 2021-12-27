import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
  }

  get isAuthenticated() {
    return this.authenticationService.isAuthenticated;
  }

  get identifier() {
    return this.authenticationService.getIdentifier;
  }

  get can_read_users() {
    return this.authenticationService.getPermissions.can_read_users;
  }

  get can_create_users() {
    return this.authenticationService.getPermissions.can_create_users;
  }

  get can_update_users() {
    return this.authenticationService.getPermissions.can_update_users;
  }

  get can_delete_users() {
    return this.authenticationService.getPermissions.can_delete_users;
  }

  get no_permission() {
    return this.authenticationService.getPermissions.no_permission;
  }

  ngOnInit(): void {
  }

}

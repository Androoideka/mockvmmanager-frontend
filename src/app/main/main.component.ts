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

  get authenticated() {
    return this.authenticationService.authenticated;
  }

  get identifier() {
    return this.authenticationService.identifier;
  }

  get can_read_users() {
    return this.authenticationService.can_read_users;
  }

  get can_create_users() {
    return this.authenticationService.can_create_users;
  }

  get can_update_users() {
    return this.authenticationService.can_update_users;
  }

  get can_delete_users() {
    return this.authenticationService.can_delete_users;
  }

  get no_permission() {
    return this.authenticationService.no_permission;
  }

  ngOnInit(): void {
  }

}

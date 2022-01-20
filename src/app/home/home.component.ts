import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get authenticated(): boolean {
    return this.authenticationService.authenticated;
  }

  get identifier(): string {
    return this.authenticationService.identifier;
  }

  get permissions(): string[] {
    return this.authenticationService.permissions.display;
  }

  get no_permission(): boolean {
    return this.authenticationService.permissions.no_permission;
  }

}

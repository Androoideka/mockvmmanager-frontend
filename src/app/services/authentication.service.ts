import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse, LoginRequest} from "../interfaces/user-dto";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Authentication, User} from "../interfaces/user-model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = 'http://localhost:8080/user';
  private loginUrl: string = '/login'
  private logoutUrl: string = '/logout';
  private authentication: Authentication;

  constructor(private httpClient: HttpClient) {
    this.authentication = Authentication.fromLocalStorage();
  }

  get authenticated(): boolean {
    return this.authentication.authenticated;
  }

  get token(): string {
    return this.authentication.token;
  }

  get identifier(): string {
    return this.authentication.user.name + ' ' + this.authentication.user.surname;
  }

  get id(): number {
    return this.authentication.user.userId;
  }

  get can_read_users(): boolean {
    return this.authentication.authenticated && this.authentication.user.permissionList.can_read_users;
  }

  get can_create_users(): boolean {
    return this.authentication.authenticated && this.authentication.user.permissionList.can_create_users;
  }

  get can_update_users(): boolean {
    return this.authentication.authenticated && this.authentication.user.permissionList.can_update_users;
  }

  get can_delete_users(): boolean {
    return this.authentication.authenticated && this.authentication.user.permissionList.can_delete_users;
  }

  get no_permission(): boolean {
    return this.authentication.user.permissionList.no_permission;
  }

  set user(user: User) {
    this.authentication.user = user;
  }

  obtainAuthentication(login: LoginRequest): Observable<Authentication> {
    return this.httpClient.post<AuthenticationResponse>(this.apiUrl + this.loginUrl, login).pipe<Authentication>(map(response => {
      this.authentication = Authentication.fromResponse(response);
      this.authentication.toLocalStorage();
      return this.authentication;
    }));
  }

  logOut(): void {
    localStorage.clear();
    this.httpClient.get(this.apiUrl + this.logoutUrl).subscribe(() => {
      this.authentication = Authentication.fromLocalStorage();
    });
    this.authentication.authenticated = false;
  }
}

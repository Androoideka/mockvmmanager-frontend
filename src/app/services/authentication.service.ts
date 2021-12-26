import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Authentication, AuthenticationResponse, Login} from "../interfaces/login";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {PermissionList} from "../interfaces/user-model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = "http://localhost:8080/user";
  private loginUrl: string = "/login"
  private logoutUrl: string = "/logout";
  private authentication: Authentication;

  constructor(private httpClient: HttpClient) {
    this.authentication = AuthenticationService.loadAuthentication();
  }

  get isAuthenticated(): boolean {
    return this.authentication.authenticated;
  }

  get getToken(): string {
    return this.authentication.token;
  }

  get getIdentifier(): string {
    return this.authentication.identifier;
  }

  get getPermissions(): PermissionList {
    return this.authentication.permissionList;
  }

  private static loadAuthentication(): Authentication {
    const token: string = localStorage.getItem('token') ?? '';
    const identifier: string = localStorage.getItem('identifier') ?? '';
    const can_read_users: boolean = localStorage.getItem('can_read_users') === 'true';
    const can_create_users: boolean = localStorage.getItem('can_create_users') === 'true';
    const can_update_users: boolean = localStorage.getItem('can_update_users') === 'true';
    const can_delete_users: boolean = localStorage.getItem('can_delete_users') === 'true';
    const permissionList = PermissionList.fromValues(can_read_users, can_create_users, can_update_users, can_delete_users);
    return new Authentication(!!token, token, identifier, permissionList);
  }

  private saveAuthentication(authentication: Authentication): void {
    this.authentication = authentication;
    localStorage.setItem('token', this.authentication.token);
    localStorage.setItem('identifier', this.authentication.identifier);
    localStorage.setItem('can_read_users', String(this.authentication.permissionList.can_read_users));
    localStorage.setItem('can_create_users', String(this.authentication.permissionList.can_create_users));
    localStorage.setItem('can_update_users', String(this.authentication.permissionList.can_update_users));
    localStorage.setItem('can_delete_users', String(this.authentication.permissionList.can_delete_users));
  }

  obtainAuthentication(login: Login): Observable<Authentication> {
    return this.httpClient.post<AuthenticationResponse>(this.apiUrl + this.loginUrl, login).pipe<Authentication>(map(response => {
      this.authentication = Authentication.fromResponse(response);
      this.saveAuthentication(this.authentication);
      return this.authentication;
    }));
  }

  logOut(): void {
    localStorage.clear();
    this.httpClient.post(this.apiUrl + this.logoutUrl, JSON.stringify("test")).subscribe(() => {
      console.log("Logged out.");
      this.authentication = AuthenticationService.loadAuthentication();
    });
  }
}

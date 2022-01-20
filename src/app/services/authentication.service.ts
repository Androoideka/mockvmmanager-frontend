import { Injectable } from '@angular/core';
import {Authentication, PermissionList, User} from "../model/user-model";
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse, LoginRequest} from '../model/user-dto';
import {map, Observable} from 'rxjs';

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

  get permissions(): PermissionList {
    return this.authentication.user.permissionList;
  }

  set user(user: User) {
    this.authentication.user = user;
    this.authentication.toLocalStorage();
  }

  includes(permissionList: PermissionList) {
    return this.authentication.user.permissionList.includes(permissionList);
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

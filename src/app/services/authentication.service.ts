import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse, LoginRequest} from "../interfaces/user-dto";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Authentication, PermissionList} from "../interfaces/user-model";

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

  get isAuthenticated(): boolean {
    return this.authentication.authenticated;
  }

  get getToken(): string {
    return this.authentication.token;
  }

  get getIdentifier(): string {
    return this.authentication.user.name + ' ' + this.authentication.user.surname;
  }

  get getPermissions(): PermissionList {
    return this.authentication.user.permissionList;
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

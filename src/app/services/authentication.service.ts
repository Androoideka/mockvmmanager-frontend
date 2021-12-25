import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Authentication, Login} from "../interfaces/login";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = "http://localhost:8080";
  private loginUrl: string = "/user/login"
  private authentication: Authentication;

  constructor(private httpClient: HttpClient) {
    this.authentication = {
      token: localStorage.getItem('token') ?? '',
      identifier: localStorage.getItem('identifier') ?? ''
    }
  }

  getToken(): string {
    return this.authentication.token;
  }

  getIdentifier(): string {
    return this.authentication.identifier;
  }

  private saveAuthentication(authentication: Authentication): void {
    this.authentication = authentication;
    localStorage.setItem('token', this.authentication.token);
    localStorage.setItem('identifier', this.authentication.identifier);
  }

  isAuthenticated(): boolean {
    return !!this.authentication.token;
  }

  obtainAuthentication(login: Login): Observable<Authentication> {
    return this.httpClient.post<Authentication>(this.apiUrl + this.loginUrl, login).pipe<Authentication>(map(response => {
      this.saveAuthentication(response);
      return response;
    }));
  }

  logOut(): void {
    localStorage.clear();
    this.authentication = {
      token: localStorage.getItem('token') ?? '',
      identifier: localStorage.getItem('identifier') ?? ''
    }
  }
}

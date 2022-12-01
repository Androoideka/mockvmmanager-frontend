import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from 'rxjs';
import { environment } from '@environments/environment'
import {Authentication, User} from "@model/user-model";
import {AuthenticationResponse, LoginRequest} from '@model/user-dto';
import {PermissionCarrier} from "@model/permission-model";
import {ListenerService} from "@services/listener.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userUrl: string = '/user';
  private loginUrl: string = '/login'
  private logoutUrl: string = '/logout';
  private authentication: Authentication;

  constructor(private httpClient: HttpClient,
              private listenerService: ListenerService) {
    this.authentication = Authentication.fromLocalStorage();
    if(this.authentication.authenticated) {
      this.listenerService.connect(this.token, String(this.id));
    }
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

  get permissions(): PermissionCarrier {
    return this.authentication.user.permissionList;
  }

  set user(user: User) {
    this.authentication.user = user;
    this.authentication.toLocalStorage();
  }

  includes(permissionList: PermissionCarrier) {
    return this.authentication.user.permissionList.includes(permissionList);
  }

  obtainAuthentication(login: LoginRequest): Observable<Authentication> {
    return this.httpClient.post<AuthenticationResponse>(environment.apiUrl + this.userUrl + this.loginUrl, login).pipe<Authentication>(map(response => {
      this.authentication = Authentication.fromResponse(response);
      this.authentication.toLocalStorage();
      this.listenerService.connect(this.token, String(this.id));
      return this.authentication;
    }));
  }

  logOut(): void {
    localStorage.clear();
    this.httpClient.get(environment.apiUrl + this.userUrl + this.logoutUrl).subscribe(() => {
      this.authentication = Authentication.fromLocalStorage();
    });
    this.listenerService.disconnect();
    this.authentication.authenticated = false;
  }
}

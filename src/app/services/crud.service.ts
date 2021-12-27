import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User, UserPage} from "../interfaces/user-model";
import {UserPageResponse, UserResponse} from "../interfaces/user-dto";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl: string = 'http://localhost:8080';
  private userUrl: string = '/user';
  private createUrl: string = '/create';
  private listUrl: string = '/list';
  private editUrl: string = '/edit';
  private deleteUrl: string = '/delete';

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) { }

  createUser(user: User): Observable<null> {
    const url: string = this.apiUrl + this.userUrl + this.createUrl;
    return this.httpClient.post<null>(url, user);
  }

  showUser(userId: number): Observable<User> {
    const url: string = this.apiUrl + this.userUrl + '/' + userId;
    return this.httpClient.get<UserResponse>(url).pipe<User>(map(response => {
      return User.fromResponse(response);
    }));
  }

  listUsers(page: number): Observable<UserPage> {
    let url: string = this.apiUrl + this.userUrl + this.listUrl;
    if(page !== 0) {
      url += '?page=' + page;
    }
    return this.httpClient.get<UserPageResponse>(url).pipe<UserPage>(map(response => {
      const users: User[] = [];
      for(const userResponse of response.content) {
        const user = User.fromResponse(userResponse);
        users.push(user);
      }
      const userPage: UserPage = {
        content: users,
        totalPages: response.totalPages
      }
      return userPage;
    }));
  }

  editUser(userId: number, newUser: User): Observable<null> {
    const url: string = this.apiUrl + this.userUrl + this.editUrl + '/' + userId;
    return this.httpClient.put<null>(url, newUser).pipe(map(response => {
      if(this.authenticationService.id == userId) {
        this.authenticationService.user = newUser;
      }
      return response;
    }));
  }

  deleteUser(user: User): Observable<null> {
    const url: string = this.apiUrl + this.userUrl + this.deleteUrl + '/' + user.userId;
    return this.httpClient.delete<null>(url).pipe(map(response => {
      if(this.authenticationService.id == user.userId) {
        this.authenticationService.logOut();
      }
      return response;
    }));
  }

}

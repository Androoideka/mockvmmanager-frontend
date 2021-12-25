import { Injectable } from '@angular/core';
import {User} from "../interfaces/user-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl: string = "http://localhost:8080";
  private createUrl: string = "/user/create"

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<null> {
    return this.httpClient.post<null>(this.apiUrl + this.createUrl, user);
  }
}

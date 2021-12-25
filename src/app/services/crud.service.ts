import { Injectable } from '@angular/core';
import {User} from "../interfaces/user-model";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl: string = "http://localhost:8080";
  private createUrl: string = "/user/create"

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<unknown> {
    return this.httpClient.post<null>(this.apiUrl + this.createUrl, user);
  }
}

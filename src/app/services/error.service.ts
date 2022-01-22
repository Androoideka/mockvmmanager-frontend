import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorLog, ErrorLogPage, ErrorPageResponse} from "../model/error-model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private apiUrl: string = 'http://localhost:8080';
  private errorUrl: string = '/error';
  private listUrl: string = '/list';

  constructor(private httpClient: HttpClient) { }

  listErrors(page: number): Observable<ErrorLogPage> {
    const url = this.apiUrl + this.errorUrl + this.listUrl + '?page=' + page;
    return this.httpClient.get<ErrorPageResponse>(url).pipe<ErrorLogPage>(map(response => {
      const logs: ErrorLog[] = [];
      for(const err of response.content) {
        logs.push(ErrorLog.fromResponse(err));
      }
      const errorLogPage: ErrorLogPage = {
        content: logs,
        totalPages: response.totalPages
      }
      return errorLogPage;
    }))
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authenticationService.authenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authenticationService.token
        }
      });
    }

    return next.handle(request).pipe(catchError(
      (error => {
        if(error instanceof HttpErrorResponse) {
          return this.handleServerError(error);
        }
        return throwError(() => 'Please try again.\n' + error);
      })
    ));
  }

  private handleServerError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if(error.status === 0) {
      errorMessage = 'Please try again.';
    }
    if(error.status === 400) {
      errorMessage = error.error.message;
    }
    if(error.status === 401) {
      errorMessage = 'Your credentials were incorrect.';
    }
    if(error.status === 403) {
      errorMessage = 'You are not authorised to do this operation.';
      this.router.navigate(['']);
    }
    if(error.status == 409) {
      errorMessage = error.error.message;
    }
    return throwError(() => errorMessage);
  }
}

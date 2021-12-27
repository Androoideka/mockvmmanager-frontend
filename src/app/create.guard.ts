import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CreateGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authenticationService.can_create_users) {
      window.alert('You do not have the can_create_users permission.');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}

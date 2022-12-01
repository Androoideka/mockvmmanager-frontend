import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "@services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredPermissions = route.data['requiredPermissions'];
    if(requiredPermissions !== undefined) {
      if(!this.authenticationService.includes(requiredPermissions)) {
        window.alert('You do not have the required permissions.\n(need: ' +
          requiredPermissions.display.reduce((foldedValue: string, currentValue: string) => foldedValue + ', ' + currentValue) +
          ')');
        this.router.navigate(['']).then(() => {});
        return false;
      }
    }
    return true;
  }

}

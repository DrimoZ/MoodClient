import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {AuthenticationService} from "../Services/ApiRequest/authentication.service";

@Injectable({
  providedIn: 'root'
})

export class RouterAuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isUserConnected().pipe(
      map(res => {
        if (res === 200) {
          // If the user is connected, navigate to the home page
          this._router.navigate(['home/newsfeed']);
          return false;
        } else {
          return true;
        }
      }),
      catchError(error => {
        if (error.status === 401) {
          return of(true);
        } else {
          // If there is an error, navigate to the error page
          this._router.navigate(['connectionRefused']);
          return of(false);
        }
      })
    );
  }
}

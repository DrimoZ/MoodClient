import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthenticationService} from "../Services/authentication.service";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MainAuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isUserConnected().pipe(
      map(res => {
        if (res === 200) {
          // If the user is connected, navigate to the home page
          return true;
        } else {
          this._router.navigate(['login']);
          return false;
        }
      }),
      catchError(error => {
        if (error.status === 401) {
          return of(false);
        } else {
          // If there is an error, navigate to the error page
          this._router.navigate(['connectionRefused']);
          return of(false);
        }
      })
    );
  }
}

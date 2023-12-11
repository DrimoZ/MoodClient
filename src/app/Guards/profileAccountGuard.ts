import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {catchError, map, Observable, of, retry} from "rxjs";
import {UserService} from "../Services/ApiRequest/user.service";

@Injectable({
  providedIn: 'root'
})

export class ProfileAccountGuard implements CanActivate {
  constructor(private _router: Router, private _userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let id = state.url.split('home/')[1].split('/')[0]

    return this._userService.getUserIdAndRole().pipe(
      map( res => {
        if (res.userId == id) {
          return true
        }

        this._router.navigate(['home/' + id + '/shared'])
        return false;
      })
    )

  }
}

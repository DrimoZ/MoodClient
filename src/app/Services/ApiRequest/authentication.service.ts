import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, NEVER, Observable, throwError} from "rxjs";
import {DtoOutputUserSignin} from "../../Dtos/Users/Outputs/dto-output-user-signin";
import {DtoOutputUserSignup} from "../../Dtos/Users/Outputs/dto-output-user-signup";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/auth"
  constructor(private _httpClient: HttpClient) { }

  isUserConnected(): Observable<any> {
    return this._httpClient.get(AuthenticationService._URL_API + "/isConnected");
  }

  signInUser(dto: DtoOutputUserSignin): Observable<any> {
    return this._httpClient.post<DtoOutputUserSignin>(AuthenticationService._URL_API + "/signIn", dto);
  }

  signUpUser(dto: DtoOutputUserSignup): Observable<any> {
    return this._httpClient.post<DtoOutputUserSignup>(AuthenticationService._URL_API + "/signUp", dto);
  }

  logOutUser(): Observable<any> {
    console.log("test")
    return this._httpClient.post(AuthenticationService._URL_API + "/signOut", {});
  }
}

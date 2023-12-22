import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, NEVER, Observable, throwError} from "rxjs";
import {DtoOutputUserSignIn} from "../../Dtos/Users/Outputs/dto-output-user-sign-in";
import {DtoOutputUserSignUp} from "../../Dtos/Users/Outputs/dto-output-user-sign-up";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/auth"
  constructor(private _httpClient: HttpClient) { }

  isUserConnected(): Observable<any> {
    return this._httpClient.get(AuthenticationService._URL_API + "/isConnected");
  }

  signInUser(dto: DtoOutputUserSignIn): Observable<any> {
    return this._httpClient.post<DtoOutputUserSignIn>(AuthenticationService._URL_API + "/signIn", dto);
  }

  signUpUser(dto: DtoOutputUserSignUp): Observable<any> {
    return this._httpClient.post<DtoOutputUserSignUp>(AuthenticationService._URL_API + "/signUp", dto);
  }

  logOutUser(): Observable<any> {
    return this._httpClient.post(AuthenticationService._URL_API + "/signOut", {});
  }
}

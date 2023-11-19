import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, NEVER, Observable, throwError} from "rxjs";
import {DtoOutputSignIn} from "../Dtos/dto-output-signin";
import {DtoOutputSignUp} from "../Dtos/dto-output-signup";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static _URL_API: string = environment.BASE_URL_API
  constructor(private _httpClient: HttpClient) { }

  isUserConnected(): Observable<any> {
    return this._httpClient.get(AuthenticationService._URL_API + "/IsConnected");
  }

  signInUser(dto: DtoOutputSignIn): Observable<any> {
    return this._httpClient.post<DtoOutputSignIn>(AuthenticationService._URL_API + "/SignIn", dto);
  }

  signUpUser(dto: DtoOutputSignUp): Observable<any> {
    return this._httpClient.post<DtoOutputSignUp>(AuthenticationService._URL_API + "/SignUp", dto);
  }
}

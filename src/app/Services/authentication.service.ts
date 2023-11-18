import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DtoOutputSignIn} from "../Dtos/dto-output-signin";

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
}

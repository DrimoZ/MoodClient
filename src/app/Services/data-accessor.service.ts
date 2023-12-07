import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoOutputUserUpdateAccount} from "../Dtos/Users/Outputs/dto-output-user-update-account";

@Injectable({
  providedIn: 'root'
})
export class DataAccessorService {

  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/user"
  constructor(private _httpClient: HttpClient) { }

  getUserAccount(): Observable<any> {
    return this._httpClient.get(DataAccessorService._URL_API + "/userAccount");
  }

  getUserFriends(): Observable<any> {
    return this._httpClient.get(DataAccessorService._URL_API + "/userFriends");
  }

  getUserPublications(): Observable<any> {
    return this._httpClient.get(DataAccessorService._URL_API + "/userPublications");
  }

  updateUserAccount(dto: DtoOutputUserUpdateAccount): Observable<any> {
    return this._httpClient.put(DataAccessorService._URL_API + "/userUpdateAccount", dto);
  }
}

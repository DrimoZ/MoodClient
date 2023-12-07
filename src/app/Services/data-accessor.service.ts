import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataAccessorService {

  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/user"
  constructor(private _httpClient: HttpClient) { }

  getUserAccount(): Observable<any> {
    return this._httpClient.get(DataAccessorService._URL_API + "/userAccount");
  }

  getUsers(): Observable<any> {
    return this._httpClient.get(DataAccessorService._URL_API + "/getUsers");
  }

  getUserFriends(): Observable<any> {
    return this._httpClient.get(DataAccessorService._URL_API + "/userFriends");
  }

  getUserPublications(): Observable<any> {
    return this._httpClient.get(DataAccessorService._URL_API + "/userPublications");
  }
}

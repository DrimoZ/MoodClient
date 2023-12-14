import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoOutputUserUpdateAccount} from "../../Dtos/Users/Outputs/dto-output-user-update-account";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/user"
  constructor(private _httpClient: HttpClient) { }

  getUserIdAndRole(): Observable<any> {
    return this._httpClient.get(UserService._URL_API);
  }

  getUserProfile(userLogin: string): Observable<any> {
    return this._httpClient.get(UserService._URL_API + "/" + userLogin);
  }

  getUserAccount(userLogin: string): Observable<any> {
    return this._httpClient.get(UserService._URL_API + "/" + userLogin + "/account");
  }

  getUserFriends(userLogin: string): Observable<any> {
    return this._httpClient.get(UserService._URL_API + "/" + userLogin + "/friends");
  }

  getUserPublications(userLogin: string): Observable<any> {
    return this._httpClient.get(UserService._URL_API + "/" + userLogin + "/publications");
  }

  updateUserAccount(dto: DtoOutputUserUpdateAccount): Observable<any> {
    return this._httpClient.put(UserService._URL_API + "/profile/account", dto);
  }


  getUsers(): Observable<any> {
    return this._httpClient.get(UserService._URL_API + "/getUsers");
  }
  getUsersGroups(): Observable<any>{
    return this._httpClient.get(environment.BASE_URL_API + "/api/v1/group")
  }
}

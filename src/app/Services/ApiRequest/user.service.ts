import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoOutputUserUpdateAccount} from "../../Dtos/Users/Outputs/dto-output-user-update-account";
import {DtoInputOtherUser} from "../../Dtos/Users/Inputs/dto-input-other-user";
import {DtoInputPublication} from "../../Dtos/Publication/Input/dto-input-publication";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/user"
  constructor(private _httpClient: HttpClient) { }

  getUserIdAndRole(): Observable<any> {
    return this._httpClient.get(UserService._URL_API);
  }

  getUserProfile(userId: string): Observable<any> {
    return this._httpClient.get(UserService._URL_API + "/" + userId);
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


  getDiscoverUsers(count: number, search: string): Observable<DtoInputOtherUser[]> {
    return this._httpClient.get<DtoInputOtherUser[]>(UserService._URL_API + "/discover/users",
      {params: {userCount: count, searchValue: search}
      });
  }

  getDiscoverPublications(count: number, search: string): Observable<DtoInputPublication[]> {
    return this._httpClient.get<DtoInputPublication[]>(UserService._URL_API + "/discover/publications",
      {params: {publicationCount: count, searchValue: search}
      });
  }
}

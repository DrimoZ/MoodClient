import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/friend"
  constructor(private _httpClient: HttpClient) { }

  createFriendRequest(friendId: string): Observable<any> {
    return this._httpClient.post(FriendService._URL_API + '/request/' + friendId, {});
  }

  acceptFriendRequest(friendId: string): Observable<any> {
    return this._httpClient.post(FriendService._URL_API + '/request/accept/' + friendId, {});
  }

  rejectFriendRequest(friendId: string): Observable<any> {
    return this._httpClient.post(FriendService._URL_API + '/request/reject/' + friendId, {});
  }

  deleteFriend(friendId: string): Observable<any> {
    return this._httpClient.delete(FriendService._URL_API + '/' + friendId, {});
  }
}

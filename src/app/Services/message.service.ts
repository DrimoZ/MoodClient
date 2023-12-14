import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputMessage} from "../Dtos/Groups/dto-input-message";
import {DtoOutputMessage} from "../Dtos/Groups/DtoOutputMessage";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/message"
  constructor(private _httpClient: HttpClient) { }

  getAllMessageForAGroupe(grpId:number): Observable<DtoInputMessage[]> {
    return this._httpClient.get<DtoInputMessage[]>(MessageService._URL_API + "/" + grpId);
  }

  sendOutputMessage(msg: DtoOutputMessage) {
    console.log(MessageService._URL_API, msg)
    return this._httpClient.post<DtoOutputMessage>(MessageService._URL_API, msg)
  }
}

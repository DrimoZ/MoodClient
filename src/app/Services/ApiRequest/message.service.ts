import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputMessage} from "../../Dtos/Groups/dto-input-message";
import {DtoOutputMessage} from "../../Dtos/Groups/DtoOutputMessage";
import {DtoInputUserGroup} from "../../Dtos/Groups/dto-input-userGroup";
import {DtoOutputCreateGroup} from "../../Dtos/Groups/dto-output-create-group";
import {DtoInputUserFromGroup} from "../../Dtos/Groups/dto-input-userfromGroup";
import {DtoInputGroup} from "../../Dtos/Groups/dto-input-group";
import {DtoOutputPatchGroup} from "../../Dtos/Groups/dto-output-patch-group";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private static _URL_API: string = environment.BASE_URL_API + "/api/v1/message"
    private static _URL_API_MESSAGE: string = environment.BASE_URL_API + "/api/v1/message"
    private static _URL_API_GROUP: string = environment.BASE_URL_API + "/api/v1/group"
    constructor(private _httpClient: HttpClient) { }
    getMessageFromGroupe(grpId: number, showCount: number): Observable<DtoInputMessage[]> {
        return this._httpClient.get<DtoInputMessage[]>(MessageService._URL_API_MESSAGE + "/" + grpId+ "/" + showCount);
    }
    sendOutputMessage(msg: DtoOutputMessage) {
        console.log(MessageService._URL_API, msg)
        return this._httpClient.post<DtoOutputMessage>(MessageService._URL_API_MESSAGE, msg)
    }
    getUsersGroups(): Observable<any>{
        return this._httpClient.get(MessageService._URL_API_GROUP)
    }
    getUserGroup(groupId:number): Observable<DtoInputUserGroup>{
        return this._httpClient.get<DtoInputUserGroup>(MessageService._URL_API_GROUP + "/userGroup/" + groupId)
    }
    createGroup(grp: DtoOutputCreateGroup){
        return this._httpClient.post<DtoOutputCreateGroup>(MessageService._URL_API_GROUP, grp)
    }

    getUserFromGroup(groupId: number) {
        return this._httpClient.get<DtoInputUserFromGroup[]>(MessageService._URL_API_GROUP + "/userFromGroup/" + groupId)
    }
    quitGroup(groupId: number){
      return this._httpClient.delete(MessageService._URL_API_GROUP + "/" + groupId)
    }
    getGroup(groupId: number) {
        return this._httpClient.get<DtoInputGroup>(MessageService._URL_API_GROUP + "/" + groupId)
    }
    kickUserFromGroup(groupId: number, id: string) {
      return this._httpClient.delete(MessageService._URL_API_GROUP + "/" + groupId + "/" + id)
    }

  modifyGroup(group: DtoOutputPatchGroup) {
      return this._httpClient.patch(MessageService._URL_API_GROUP, group)
    }
}

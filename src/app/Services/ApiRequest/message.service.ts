import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputMessage} from "../../Dtos/Groups/dto-input-message";
import {DtoOutputMessage} from "../../Dtos/Groups/DtoOutputMessage";
import {DtoInputUserGroup} from "../../Dtos/Groups/dto-input-userGroup";
import {DtoOutputGroup} from "../../Dtos/Groups/dto-output-group";
import {DtoInputUserFromGroup} from "../../Dtos/Groups/dto-input-userfromGroup";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private static _URL_API: string = environment.BASE_URL_API + "/api/v1/message"
    private static _URL_API_MESSAGE: string = environment.BASE_URL_API + "/api/v1/message"
    private static _URL_API_GROUP: string = environment.BASE_URL_API + "/api/v1/group"
    constructor(private _httpClient: HttpClient) { }

    getMessageForAGroupe(grpId: number, showCount: number): Observable<DtoInputMessage[]> {
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
        return this._httpClient.get<DtoInputUserGroup>(MessageService._URL_API_GROUP + "/" + groupId)
    }

    createGroup(grp: DtoOutputGroup){
        return this._httpClient.post<DtoOutputGroup>(MessageService._URL_API_GROUP, grp)
    }


    getUserFromGroup(groupId: number) {
        return this._httpClient.get<DtoInputUserFromGroup[]>(MessageService._URL_API_GROUP + "/userFromGroup/" + groupId)
    }
}

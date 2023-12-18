import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputPublicationDetail} from "../../Dtos/Publication/Input/dto-input-publication-detail";
import {DtoInputPubComment} from "../../Dtos/Publication/Input/dto-input-pub-comment";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/publication"
  constructor(private _httpClient: HttpClient) { }

  getDetailedPublication(publicationId: string): Observable<DtoInputPublicationDetail> {
    return this._httpClient.get<DtoInputPublicationDetail>(PublicationService._URL_API + "/" + publicationId);
  }

  getPublicationComments(publicationId: string): Observable<DtoInputPubComment[]> {
    return this._httpClient.get<DtoInputPubComment[]>(PublicationService._URL_API + "/" + publicationId + "/comments");
  }

  likePublication(publicationId: string, liked: boolean): Observable<any> {
    let dto = {idPublication: publicationId, isLiked: liked};

    return this._httpClient.post(PublicationService._URL_API + "/like",  dto);
  }

  commentPublication(publicationId: string, content: string): Observable<any> {
    let dto = {idPublication: publicationId, content: content};

    return this._httpClient.post(PublicationService._URL_API + "/comment",  dto);
  }

  deleteCommentInPublication(commentId: number) {
    return this._httpClient.delete(PublicationService._URL_API + "/comment/" + commentId);
  }
}

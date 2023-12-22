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

  createPublication(form: FormData): Observable<any> {
    return this._httpClient.post(PublicationService._URL_API + "/post", form)
  }

  getFriendsPublications(pubCount: number): Observable<DtoInputPublicationDetail[]> {
    return this._httpClient.get<DtoInputPublicationDetail[]>(PublicationService._URL_API + "/friends",
      {params: {publicationCount: pubCount}
      });
  }

  getDetailedPublication(publicationId: number): Observable<DtoInputPublicationDetail> {
    return this._httpClient.get<DtoInputPublicationDetail>(PublicationService._URL_API + "/" + publicationId);
  }

  getPublicationComments(publicationId: number): Observable<DtoInputPubComment[]> {
    return this._httpClient.get<DtoInputPubComment[]>(PublicationService._URL_API + "/" + publicationId + "/comments");
  }

  likePublication(publicationId: number, liked: boolean): Observable<any> {
    let dto = {PublicationId: publicationId, isLiked: liked};

    return this._httpClient.post(PublicationService._URL_API + "/like",  dto);
  }

  commentPublication(publicationId: number, content: string): Observable<any> {
    let dto = {PublicationId: publicationId, CommentContent: content};

    return this._httpClient.post(PublicationService._URL_API + "/comment",  dto);
  }

  deleteCommentInPublication(commentId: number): Observable<any> {
    return this._httpClient.delete(PublicationService._URL_API + "/comment/" + commentId);
  }

  deletePublication(pubId: number): Observable<any> {
    return this._httpClient.patch(PublicationService._URL_API, parseInt(pubId.toString()));
  }
}

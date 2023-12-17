import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputPublicationDetail} from "../../Dtos/Publication/Input/dto-input-publication-detail";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/publication"
  constructor(private _httpClient: HttpClient) { }

  getDetailedPublication(publicationId: string): Observable<DtoInputPublicationDetail> {
    return this._httpClient.get<DtoInputPublicationDetail>(PublicationService._URL_API + "/" + publicationId);
  }
}

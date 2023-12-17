import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/publication"
  constructor(private _httpClient: HttpClient) { }
}

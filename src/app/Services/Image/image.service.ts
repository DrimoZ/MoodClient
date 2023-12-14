import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {DtoInputImage} from "../../Dtos/image/dto-input-image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private static _URL_API: string = environment.BASE_URL_API + "/api/v1/image"
  constructor(private _httpClient: HttpClient) { }
  getImageData(id :number):Observable<string>
  {
    if(id == 0)
    {
      return of("./assets/no_profile_picture.png");
    }
     return this._httpClient.get<DtoInputImage>(ImageService._URL_API + "/" + id)
       .pipe(
         map(img =>
           {
             return this.getImageURL(img.data);
           }
         ));
  }
  getImageURL(byteArray: string): string {
    const blob = new Blob([new Uint8Array(atob(byteArray).split('').map(char => char.charCodeAt(0)))], { type: 'image/*' });
    return URL.createObjectURL(blob);
  }



}

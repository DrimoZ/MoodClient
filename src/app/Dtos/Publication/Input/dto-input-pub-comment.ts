import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputPubComment {
  content: string;
  date: Date;
  id: number;
  idUserImage: number;
  imageUrl: SafeUrl;
  nameUser: string;
}

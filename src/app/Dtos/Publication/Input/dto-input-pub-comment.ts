import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputPubComment {
  content: string;
  date: Date;
  id: number;
  idAuthor: string;
  idAuthorImage: number;
  imageUrl: SafeUrl;
  nameAuthor: string;
}


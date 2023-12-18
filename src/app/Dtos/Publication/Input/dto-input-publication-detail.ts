import {DtoInputPubElement} from "./dto-input-pub-element";
import {DtoInputPubComment} from "./dto-input-pub-comment";
import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputPublicationDetail {
  content: string;
  commentCount: number;
  comments: DtoInputPubComment[];
  date: Date;
  elements: DtoInputPubElement[];
  hasConnectedLiked: boolean;
  id: number;
  idAuthor: string;
  idAuthorImage: number;
  isFromConnected: boolean;
  likeCount: number;
  nameAuthor: string;
  urlImage: SafeUrl;
}

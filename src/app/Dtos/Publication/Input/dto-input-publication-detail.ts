import {DtoInputPubElement} from "./dto-input-pub-element";
import {DtoInputPubComment} from "./dto-input-pub-comment";
import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputPublicationDetail {
  publicationContent: string;
  commentCount: number;
  comments: DtoInputPubComment[];
  publicationDate: Date;
  elements: DtoInputPubElement[];
  hasConnectedLiked: boolean;
  publicationId: number;
  authorId: string;
  authorImageId: number;
  isFromConnected: boolean;
  likeCount: number;
  authorName: string;
  imageUrl: SafeUrl;
  authorRole: number;
}

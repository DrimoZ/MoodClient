import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputPubComment {
  authorId: string;
  authorImageId: number;
  authorName: string;
  authorRole: number;
  commentContent: string;
  commentDate: Date;
  commentId: number;
  imageUrl: SafeUrl;
}


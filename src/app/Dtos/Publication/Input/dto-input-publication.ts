import {DtoInputPubElement} from "./dto-input-pub-element";

export interface DtoInputPublication {
  commentCount: number;
  elements: DtoInputPubElement[];
  likeCount: number;
  publicationContent: string;
  publicationDate: Date;
  publicationId: number;
}

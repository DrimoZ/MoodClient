import {DtoInputPubElement} from "./dto-input-pub-element";

export interface DtoInputPublication {
  commentCount: number;
  content: string;
  date: Date;
  elements: DtoInputPubElement[];
  id: number;
  likeCount: number;
}

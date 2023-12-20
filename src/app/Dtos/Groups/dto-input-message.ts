import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputMessage {
  id:number;
  content: string;
  userLogin: string;
  userName: string;
  userId:string;
  groupId:number;
  date : string;
  imageId: number;
  url:SafeUrl;
  isDeleted : boolean;
}

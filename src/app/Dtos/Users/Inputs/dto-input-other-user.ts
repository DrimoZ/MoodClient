import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputOtherUser {
  commonFriendCount: number;
  id: string
  isFriendWithConnected: number;
  login: string;
  name: string;
  idImage: number;
  imageUrl: SafeUrl;
}

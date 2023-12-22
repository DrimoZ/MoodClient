import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputOtherUser {
  commonFriendCount: number;
  imageId: number;
  imageUrl: SafeUrl;
  isFriendWithConnected: number;
  userId: string
  userLogin: string;
  userName: string;
}

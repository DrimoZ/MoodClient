import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputNotification {
  friendRequestDate: Date;
  imageId: number;
  imageUrl: SafeUrl;
  isAccepted: boolean;
  isConnectedEmitter: boolean;
  isDone: boolean;
  isFriendWithConnected: number;
  userId: string;
  userName: string;
}

import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputUserProfile {
  accountDescription: string;
  friendCount: number;
  imageId: number;
  imageUrl: SafeUrl;
  isConnectedUser: boolean;
  isFriendWithConnected: number;
  publicationCount: number;
  userId: string;
  userName: string;
  userRole: number;
}

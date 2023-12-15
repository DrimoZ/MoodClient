import {SafeUrl} from "@angular/platform-browser";

export interface DtoInputUserProfile {
  login: string;

  isPublic: boolean;
  isFriendWithConnected: number;

  name: string;
  title: string;
  description: string;

  friendCount: number;
  publicationCount: number;

  idImage: number;
  imageUrl: SafeUrl;
}

import {DtoInputOtherUser} from "../Users/Inputs/dto-input-other-user";

export interface DtoInputUserFriends {
  isConnectedUser: boolean;
  isFriendPublic: boolean;
  friends: DtoInputOtherUser[];
}


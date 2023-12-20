export interface ClassicEvent {
  Type: 'UserFailedSignUp' | 'UserSignUp' | 'UserFailedSignIn' | 'UserSignIn' | 'UserLogOut' | 'DiscoverChange' | 'MessageGroupModified'
    | 'GroupClicked' | 'MemberClicked' | 'ChangeNavBar' | 'AddMemberClicked' | 'RecevievedMessage';
  Payload: any;
}

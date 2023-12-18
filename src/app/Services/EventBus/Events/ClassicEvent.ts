export interface ClassicEvent {
  Type: 'UserFailedSignUp' | 'UserSignUp' | 'UserFailedSignIn' | 'UserSignIn' | 'UserLogOut' | 'DiscoverChange' | 'MessageGroupCreated'
    | 'groupClicked' | 'memberClicked';
  Payload: any;
}

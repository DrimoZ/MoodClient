export interface ClassicEvent {
  Type: 'UserFailedSignUp' | 'UserSignUp' | 'UserFailedSignIn' | 'UserSignIn' | 'UserLogOut' | 'DiscoverChange' | 'MessageNewGroup';
  Payload: any;
}

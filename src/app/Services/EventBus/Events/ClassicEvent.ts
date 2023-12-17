export interface ClassicEvent {
  Type: 'UserFailedSignUp' | 'UserSignUp' | 'UserFailedSignIn' | 'UserSignIn' | 'UserLogOut' | 'DiscoverChange' | 'MessageGroupeCreated';
  Payload: any;
}

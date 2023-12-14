export interface ClassicEvent {
  Type: 'UserFailedSignUp' | 'UserSignUp' | 'UserFailedSignIn' | 'UserSignIn' | 'UserLogOut' | 'DiscoverChange';
  Payload: any;
}

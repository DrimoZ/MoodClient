export interface ClassicEvent {
  Type: 'DiscoverChange' | 'MessageGroupModified' | 'GroupClicked'      | 'MemberClicked'
      | 'ChangeNavBar'   | 'AddMemberClicked'     | 'RecevievedMessage' | 'ActionValidation'
      | 'DeletedMessage' | 'UserHasLeft'          | 'UserHasJoin'       | 'ErrPrivateConvAlreadyCreated';
  Payload: any;
}

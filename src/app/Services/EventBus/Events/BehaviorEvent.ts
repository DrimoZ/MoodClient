export interface BehaviorEvent {
  Type: 'UserId' | 'ConnectedUserId' | 'DiscoverSearch';
  Payload: string;
}

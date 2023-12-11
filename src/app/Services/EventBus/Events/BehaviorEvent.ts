export interface BehaviorEvent {
  Type: 'UserId';
  Payload: any; // Type unsafe, maybe narrow it down
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {BehaviorEvent} from "./Events/BehaviorEvent";

@Injectable({
  providedIn: 'root'
})
export class BehaviorEventBusService {
  private eventBus = new BehaviorSubject<BehaviorEvent>({
    Type: "UserId",
    Payload: ""
  });

  constructor() { }

  emitEvent(event: BehaviorEvent): void {
    this.eventBus.next(event);
  }

  onEvent(): Observable<BehaviorEvent> {
    return this.eventBus.asObservable();
  }

}

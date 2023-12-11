import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BehaviorEventBusService {
  private eventBus = new BehaviorSubject<any>(undefined);

  constructor() { }

  emitEvent(event: any) {
    this.eventBus.next(event);
  }

  onEvent() {
    return this.eventBus.asObservable();
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {ClassicEvent} from "./Events/ClassicEvent";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventBus = new Subject<ClassicEvent>(); //Behavior Subject

  emitEvent(event: ClassicEvent) {
    this.eventBus.next(event);
  }

  onEvent() {
    return this.eventBus.asObservable();
  }
}

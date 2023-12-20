import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {ClassicEvent} from "./Events/ClassicEvent";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private _eventBus = new Subject<ClassicEvent>();

  emitEvent(event: ClassicEvent) {
    this._eventBus.next(event);
  }

  onEvent() {
    return this._eventBus.asObservable();
  }
}

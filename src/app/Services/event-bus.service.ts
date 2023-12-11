import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventBus = new Subject<any>(); //Behavior Subject

  emitEvent(event: any) {
    this.eventBus.next(event);
  }

  onEvent() {
    return this.eventBus.asObservable();
  }
}

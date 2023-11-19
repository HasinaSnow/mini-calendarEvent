import { Observable, of } from "rxjs";
import { IEvent } from "../models/event.model";
import { EventGateway } from "../ports/event.gateway";


export class InMemoryEventGateway extends EventGateway {

    private events: IEvent[] = []

    withEvents(events: IEvent[]): InMemoryEventGateway {
      this.events = events
      return this
    }

    // get all the event list
    retrieveAll(): Observable<IEvent[]> {
        return of(this.events)
    }

    // get one event by id
    retrieveOne(id: number): Observable<IEvent| null> {
      const event: IEvent|undefined = this.events.find(event => event.id == id)
      return of(event == undefined ? null : event)
    }

}
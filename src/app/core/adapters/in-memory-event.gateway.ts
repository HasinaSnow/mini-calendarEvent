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

    addNew(event: IEvent): Observable<IEvent> {
      const lastEventid = this.events.pop()
      if(lastEventid)
        event.id = lastEventid.id + 1
      else
        event.id = 1
      console.log(event)
      const NewEvents: IEvent[] = [ ...this.events, event ]
      this.events = NewEvents
      return of(event)
    }

    override edit(updatedEvent: IEvent): Observable<IEvent[]|null>{
      console.log(updatedEvent.id)
      const e = this.events.find(event => event.id == updatedEvent.id)
      if(!e) {
        console.log('event updated not retrieved')
        return of(null)
      } else {
        this.events = this.events.map(event => event.id == updatedEvent.id ? updatedEvent : event)
        return of(this.events)
      }
    }

}
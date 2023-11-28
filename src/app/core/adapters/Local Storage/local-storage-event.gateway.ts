import { Observable, of } from "rxjs";
import { IEvent } from "../../models/event.model";
import { EventGateway } from "../../ports/event.gateway";

export class LocalStorageEventGateway extends EventGateway {

    withEvents(events: IEvent[]): LocalStorageEventGateway {
        events.forEach(event => {
            this.addNew(event)
        });
        return this
    }

    override retrieveAll(): Observable<IEvent[]> {
        return of(this.getEvents())
    }
    override retrieveOne(id: number): Observable<IEvent | null> {
        const oneById = this.getOne(id)
        return of(oneById != undefined ? oneById : null)
    }

    override addNew(event: IEvent): Observable<IEvent> {
       const events = this.getEvents()
       const lastId = this.getLastId()
       event.id = lastId + 1
       this.updateEvents([ ...events, event])
       return of(event)
    }

    override edit(event: IEvent): Observable<IEvent[] | null> {
        const events = this.getEvents()
        const newEvents: IEvent[] = events.map(e => e.id == event.id ? event : e )
        this.updateEvents(newEvents)
        return of(events)
    }

    override remove(id: number): Observable<IEvent[] | null> {
        const events = this.getEvents()
        if(events.find(event => event.id == id) === undefined)
            return of(null)
        const newEvents = this.getEvents().filter(event => event.id !== id)
        this.updateEvents(newEvents)
        return of(newEvents)
    }

    private getEvents(): IEvent[] {
        const events = localStorage.getItem('events')
        return events ? JSON.parse(events) : [] as IEvent[]
    }

    private getOne(id: number): IEvent|undefined {
        const events = this.getEvents()
        const oneByid = events.find(event => event.id == id)
        return oneByid
    }

    private getLastId(): number{
        const eventsUsed = this.getEvents()
        const lastEvent = eventsUsed.pop()
        return lastEvent != undefined ? lastEvent.id : 1
    }

    private updateEvents(events: IEvent[]): void {
        localStorage.setItem('events', JSON.stringify(events))
    }
}
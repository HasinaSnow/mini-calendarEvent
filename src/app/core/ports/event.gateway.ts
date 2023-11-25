import { Observable } from "rxjs";
import { IEvent } from "../models/event.model"

export abstract class EventGateway {
    abstract retrieveAll(): Observable<IEvent[]>
    abstract retrieveOne(id: number): Observable<IEvent|null>
    abstract addNew(event: IEvent): Observable<IEvent>
    abstract edit(event: IEvent): Observable<IEvent[]|null>
    abstract remove(id: number): Observable<IEvent[]|null>
}
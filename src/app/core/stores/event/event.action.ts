import { IEvent } from "../../models/event.model"

export class RetrievOneEvent {
    static readonly type: string = '[Event Page] Retrieve events'
    
    constructor(public idEvent: number) {}
}

export class OneEventRetrieved {
    static readonly type: string = '[Event Api] One event retrieved'

    constructor(public event: IEvent) {}
}

export class EventNotRetrieved {
    static readonly type: string = '[Event Api] Event not retrieved'
}

export class NotFoundRedirection {
    static readonly type: string = '[NotFound Page] page not found'
}
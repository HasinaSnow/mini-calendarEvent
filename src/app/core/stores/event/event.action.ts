import { IEvent } from "../../models/event.model"

// action to get all events in the source 
export class RetrievAllEvents {
    static readonly type: string = '[Event Page] Retrieve events'
}

// action to update events state
export class EventsRetrieved {
    static readonly type: string = '[Event Api] Events retrieved'

    constructor(public events: IEvent[]) {}
}

export class RetrievOneEvent {
    static readonly type: string = '[Event Page] Retrieve one event'
    constructor(public idEvent: number) {}
}

export class OneEventRetrieved {
    static readonly type: string = '[Event Api] One event retrieved'
    constructor(public event: IEvent) {}
}

export class AddNewEvent {
    static readonly type: string = '[Event Api] Add new event'
    constructor(public event: IEvent) {}
}

export class NewEventAdded {
    static readonly type: string = '[Event Api] One event retrieved'
    constructor(public event: IEvent) {}
}

export class EditEvent {
    static readonly type: string = '[Event Api] Edit event'
    constructor(public event: IEvent) {}
}

export class EventEdited {
    static readonly type: string = '[Event Api] Event edited'
    constructor(public events: IEvent[]) {}
}

export class EventNotAdded {
    static readonly type: string = '[Event Api] One event not added'
}

export class EventNotRetrieved {
    static readonly type: string = '[Event Api] Event not retrieved'
}
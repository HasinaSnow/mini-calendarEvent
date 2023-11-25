import { IEvent } from "../../models/event.model"

// get all
export class RetrievAllEvents {
    static readonly type: string = '[Event Page] Retrieve events'
}

// get one
export class RetrievOneEvent {
    static readonly type: string = '[Event Page] Retrieve one event'
    constructor(public idEvent: number) {}
}

// add one
export class AddNewEvent {
    static readonly type: string = '[Event Api] Add new event'
    constructor(public event: IEvent) {}
}

// edit one
export class EditEvent {
    static readonly type: string = '[Event Api] Edit event'
    constructor(public event: IEvent) {}
}

// delete one
export class DeleteEvent {
    static readonly type: string = '[Event Api] Delete event'
    constructor(public idEvent: number) {}
}

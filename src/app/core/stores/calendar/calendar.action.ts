import { IEvent } from "../../models/event.model"

// action to get all events in the source 
export class RetrievAllEvents {
    static readonly type: string = '[Calendar Page] Retrieve events'
}

// action to update events state
export class EventsRetrieved {
    static readonly type: string = '[Event Api] Events retrieved'

    constructor(public events: IEvent[]) {}
}

export class MonthToIncremented {
    static readonly type: string = '[Calendar Page] Month to incremented'
}

export class MonthToDecremented {
    static readonly type: string = '[Calendar Page] Month to decremented'
}

export class YearToIncremented {
    static readonly type: string = '[Calendar Page] Year to incremented'
}

export class YearToDecremented {
    static readonly type: string = '[Calendar Page] Year to decremented'
}

// action to update the month selected
export class MonthToSelected {
    static readonly type: string = '[Calendar Page] Month to selected'

    constructor(public month: number) {}
}

export class YearToSelected {
    static readonly type: string = '[Calendar Page] Year to selected'

    constructor(public year: number) {}
}
export class DayToSelected {
    static readonly type: string = '[Calendar Page] Day to selected'
}

export class DateToSelected {
    static readonly type: string = '[Calendar Page] Date to selected'

    constructor(public date: number) {}
}

export class DaySelected {
    static readonly type: string = '[Calendar Page] Day selected'
}

export class DateSelected {
    static readonly type: string = '[Calendar Page] Date selected'
}

export class MonthSelected {
    static readonly type: string = '[Calendar Page] Month selected'
}

export class YearSelected {
    static readonly type: string = '[Calendar Page] Month selected'
}

export class ResetonToday {
    static readonly type: string = '[Calendar age] Reset on today'
}